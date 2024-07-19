import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';


const ClassPage = () => {
    const {id} = useParams();
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const res = await fetch(`/api/classes/${id}`);
                const data = await res.json();
                setWorkout(data);
            } catch (error) {
                console.log('Error fetching class', error);
            } finally {
                setLoading(false);
            }
        }
        fetchWorkout();
    }, []);

    return loading ? <Spinner /> : (
        <div>
            {workout.title}
        </div>
    )
}

export default ClassPage;
