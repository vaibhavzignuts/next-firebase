'use client';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import TopCards from '@/components/TopCards';
import { useDispatch, useSelector } from 'react-redux';
import { setBudgets } from '@/redux/budgetdata/budgetdataSlice';
import { collection, getDocs, Firestore } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = () => {
    const dispatch = useDispatch();
    const { budgets } = useSelector((state: any) => state.budgetData);
    const router = useRouter();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                if (!user) {
                    router.replace('/login');
                    return;
                }

                const collectionRef = collection(db as Firestore, 'users', user.uid, 'budgets'); // Assert db as Firestore
                const querySnapshot = await getDocs(collectionRef);
                const budgetsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    budgetAmount: doc.data().budgetAmount,
                    currentBudgetAmount: doc.data().budgetAmount,
                    ...doc.data()
                }));

                dispatch(setBudgets(budgetsData));
            } catch (error) {
                console.error('Error fetching budgets:', error);
            }
        };

        fetchBudgets();
    }, [user, router, dispatch]);

    const budgetsName = budgets.map((item: any) => item.budgetName);
    const budgetAmount = budgets.map((item: any) => item.budgetAmount);
    const totalAmount = budgets.map((item: any) => item.totalAmount);

    const chartData = {
        labels: budgetsName,
        datasets: [
            {
                label: 'totalBudget $',
                data: totalAmount,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.4)',
            },
            {
                label: 'remainingBudget $',
                data: budgetAmount,
                borderColor: 'rgb(227, 39, 80)',
                backgroundColor: 'rgba(227, 39, 80, 0.4)',
            },
        ]
    };

    const chartOptions = {
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Budget Analysis'
            }
        },
        maintainAspectRatio: false,
        responsive: true
    };

    return (
        <>
            <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white'>
                <TopCards />
                <Bar data={chartData} options={chartOptions} />
            </div>
        </>
    );
};

export default BarChart;
