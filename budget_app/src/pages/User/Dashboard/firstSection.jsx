import React from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import { FaMoneyBillWave, FaRegMoneyBillAlt, FaWallet, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function FirstSection() {
    const [salary, setSalary] = useState(null);
    const [expenses, setExpenses] = useState(null);
    const [incomes, setIncomes] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                console.error('Token not available!');
                return;
            }

            try {
                const res = await axios.get('http://localhost:8000/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSalary(res.data.profile.salary); 
                setExpenses(res.data.combined_total_expenses);
                setIncomes(res.data.combined_total_income);
                console.log(res.data);
                
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchData();
    }, [token]);

    const CardData = [
        { title: "My balance", amount: salary ? `$${salary}` : "$0", icon: <FaMoneyBillWave size={40} /> },
        { title: "Monthly income", amount: incomes ? `$${incomes.toFixed(2)}` :"$0", icon: <FaRegMoneyBillAlt size={40} /> },
        { title: "Monthly expenses", amount: expenses ? `$${expenses.toFixed(2)}` :"$0", icon: <FaWallet size={40} /> },
        { title: "This Month", amount: "$25,000", icon: <FaCalendarAlt size={40} /> },
    ];


    return (
        <div>
            <Stack direction="row" justifyContent={{ xs: 'center', sm: 'space-between' }} sx={{ flexWrap: 'wrap' }}>
                {CardData.map((item, index) => (
                    <Paper key={index} sx={{ p: 1.5, display: 'flex', m: 2, minWidth: 250 }}>
                        <div style={{ fontSize: 50, color: 'inherit', marginRight: 10 }}>
                            {item.icon}
                        </div>
                        <Stack direction='column'>
                            <Typography variant="h6" color="textPrimary">
                                {item.title}
                            </Typography>
                            <Typography variant="h4" color="textSecondary">
                                {item.amount}
                            </Typography>
                        </Stack>
                    </Paper>
                ))}
            </Stack>
        </div>
    );
}
