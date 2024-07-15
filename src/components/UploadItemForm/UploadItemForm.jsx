import { useUser } from '../../context/UserContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../BackButton/BackButton';
import CancelButton from '../CancelButton/CancelButton';
import './UploadItemForm.scss';

const API_URL = import.meta.env.VITE_API_URL;

const categoryOptions = [
    { id: 1, type: 'Nursery' },
    { id: 2, type: 'Feeding' },
    { id: 3, type: 'Diapering' },
    { id: 4, type: 'Gear & Travel' },
    { id: 5, type: 'Toys' },
    { id: 6, type: 'Clothing' },
    { id: 7, type: 'Health & Safety' },
    { id: 8, type: 'Bath' },
    { id: 9, type: 'Furniture' },
    { id: 10, type: 'Bedding' },
    { id: 11, type: 'Outdoor Gear' },
    { id: 12, type: 'Learning & Educational' }
];

const UploadItemForm = () => {
    const { userId } = useUser();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        type_id: '',
        status_id: '',
        image: null,
        user_id: userId
    });
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormValues({ ...formValues, image: file });

        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formValues.name) newErrors.name = 'Name is required';
        if (!formValues.description) newErrors.description = 'Description is required';
        if (!formValues.type_id) newErrors.type_id = 'Category is required';
        if (!formValues.status_id) newErrors.status_id = 'Status is required';
        return newErrors;
    };

    const submitData = async (data, url) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        try {
            await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error('Error submitting data:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            const url = `${API_URL}/items`;
            try {
                await submitData(formValues, url);
                navigate(`/users/${userId}/items`);
                window.scrollTo(0, 0);
            } catch (err) {
                console.error('Error uploading item:', err);
            }
        }
    };

    return (
        <section className='upload-item'>
            <div className='upload-item__icons'>
                <BackButton to={-1} />
            </div>
            <form className='upload-item__form' onSubmit={handleSubmit}>
                <h1 className='upload-item__title'>Upload Item</h1>
                <div className='upload-item__field'>
                    <label htmlFor='name'>Name <span className='upload-item__required'>*</span></label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        placeholder='Enter item name'
                        value={formValues.name}
                        onChange={handleInputChange}
                    />
                    {errors.name && <p className='upload-item__error'>{errors.name}</p>}
                </div>
                <div className='upload-item__field'>
                    <label htmlFor='description'>Description <span className='upload-item__required'>*</span></label>
                    <textarea
                        id='description'
                        name='description'
                        placeholder='Enter item description'
                        value={formValues.description}
                        onChange={handleInputChange}
                    />
                    {errors.description && <p className='upload-item__error'>{errors.description}</p>}
                </div>
                <div className='upload-item__field'>
                    <label htmlFor='type_id'>Category <span className='upload-item__required'>*</span></label>
                    <select
                        id='type_id'
                        name='type_id'
                        value={formValues.type_id}
                        onChange={handleInputChange}
                    >
                        <option value=''>Select Category</option>
                        {categoryOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.type}
                            </option>
                        ))}
                    </select>
                    {errors.type_id && <p className='upload-item__error'>{errors.type_id}</p>}
                </div>
                <div className='upload-item__field'>
                    <label htmlFor='status_id'>Status <span className='upload-item__required'>*</span></label>
                    <select
                        id='status_id'
                        name='status_id'
                        value={formValues.status_id}
                        onChange={handleInputChange}
                    >
                        <option value=''>Select Status</option>
                        <option value='1'>List</option>
                        <option value='2'>Inactive</option>
                    </select>
                    {errors.status_id && <p className='upload-item__error'>{errors.status_id}</p>}
                </div>
                <div className='upload-item__field'>
                    <label htmlFor='image'>Image <span className='upload-item__required'>*</span></label>
                    {imagePreview && (
                        <img src={imagePreview} alt='Preview' className='upload-item__image-preview' />
                    )}
                    <input
                        type='file'
                        id='image'
                        name='image'
                        accept='image/*'
                        onChange={handleFileChange}
                    />
                    {errors.image && <p className='upload-item__error'>{errors.image}</p>}
                </div>
                <div className='upload-item__buttons-section'>
                    <CancelButton />
                    <button type='submit' className='upload-item__button'>SAVE</button>
                </div>
            </form>
        </section>
    );
};

export default UploadItemForm;
