'use client';
import React from 'react'
import { useSelector } from 'react-redux';


const TopCards = () => {
    const { budgets } = useSelector((state: any) => state.budgetData);
    // let totalBudget = budgets.reduce((accumulator, currentValue) => {
    //     return accumulator + currentValue.totalAmount;
    // }, 0);
    let totalBudget = budgets.reduce((accumulator, currentValue) => {
        return {
            totalBudget: accumulator.totalBudget + currentValue.totalAmount,
            count: accumulator.count + 1
        };
    }, { totalBudget: 0, count: 0 });
    let remainingAmount = budgets.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.budgetAmount
            ;
    }, 0);



    return (
        <div className='grid lg:grid-cols-5 gap-4 p-4'>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>${totalBudget.totalBudget}</p>
                    <p className='text-gray-600'>Total Budget</p>
                </div>

            </div>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>${remainingAmount}</p>
                    <p className='text-gray-600'>Remaining Amount</p>
                </div>

            </div>
            <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>{totalBudget.count}</p>
                    <p className='text-gray-600'>no.of Budgets</p>
                </div>

            </div>
        </div>
    )
}

export default TopCards