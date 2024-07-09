import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../BackButton/BackButton';
import './EditItemForm.scss';

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

const EditItemForm = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        category: '',
        status: '',
        image: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await axios.get(`${API_URL}/items/${itemId}`);
                const item = response.data;
                setFormValues({
                    name: item.name,
                    description: item.description,
                    category: item.category,
                    status: item.status,
                    image: item.image
                });
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching item data:', error);
                setIsLoading(false);
            }
        };

        fetchItemData();
    }, [itemId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleFileChange = (e) => {
        setFormValues({ ...formValues, image: e.target.files[0] });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formValues.name) newErrors.name = 'Name is required';
        if (!formValues.description) newErrors.description = 'Description is required';
        if (!formValues.category) newErrors.category = 'Category is required';
        if (!formValues.status) newErrors.status = 'Status is required';
        return newErrors;
    };

    const submitData = async (data, url, method) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        try {
            await axios({
                method,
                url,
                data: formData,
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
            const url = `${API_URL}/items/${itemId}`;
            const method = 'put';
            try {
                await submitData(formValues, url, method);
                navigate(`/items/${itemId}`);
                window.scrollTo(0, 0);
            } catch (error) {
                console.error('Error updating item:', error);
            }
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <section className='edit-item'>
            <div className='edit-item__icons'>
                <BackButton />
                {/* Add close button */}
            </div>
            <form className='edit-item__form' onSubmit={handleSubmit}>
                <h1 className='edit-item__title'>Edit Item</h1>
                <div className='edit-item__field'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={formValues.name}
                        onChange={handleInputChange}
                    />
                    {errors.name && <p className='edit-item__error'>{errors.name}</p>}
                </div>
                <div className='edit-item__field'>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        id='description'
                        name='description'
                        value={formValues.description}
                        onChange={handleInputChange}
                    />
                    {errors.description && <p className='edit-item__error'>{errors.description}</p>}
                </div>
                <div className='edit-item__field'>
                    <label htmlFor='category'>Category</label>
                    <select
                        id='category'
                        name='category'
                        value={formValues.category}
                        onChange={handleInputChange}
                    >
                        <option value=''>Select Category</option>
                        {categoryOptions.map((option) => (
                            <option key={option.id} value={option.type}>
                                {option.type}
                            </option>
                        ))}
                    </select>
                    {errors.category && <p className='edit-item__error'>{errors.category}</p>}
                </div>
                <div className='edit-item__field'>
                    <label htmlFor='status'>Status</label>
                    <select
                        id='status'
                        name='status'
                        value={formValues.status}
                        onChange={handleInputChange}
                    >
                        <option value=''>Select Status</option>
                        <option value='Listed'>Listed</option>
                        <option value='Inactive'>Inactive</option>
                    </select>
                    {errors.status && <p className='edit-item__error'>{errors.status}</p>}
                </div>
                <div className='edit-item__field'>
                    <label htmlFor='existingImage'>Existing Image</label>
                    <img
                        src={`${API_URL}/uploads/${formValues.existingImage}`}
                        alt='Current'
                        className='edit-item__existing-image'
                    />
                </div>
                <div className='edit-item__field'>
                    <label htmlFor='image'>Replace Image</label>
                    <input
                        type='file'
                        id='image'
                        name='image'
                        accept='image/*'
                        onChange={handleFileChange}
                    />
                    {errors.image && <p className='error-text'>{errors.image}</p>}
                </div>
                <button type='submit' className='edit-item__button'>Save Changes</button>
            </form>
        </section>
    );
};

export default EditItemForm;
