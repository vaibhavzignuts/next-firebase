'use client';
import { AddExpense } from '@/components/AddExpense';
import { ExpenseTable } from '@/components/ExpenseTable';
import { Progress } from '@/components/ui/progress';
import { useParams, useRouter } from 'next/navigation';
import { addExpense, selectBudgetSummary } from '@/redux/budgetdata/budgetdataSlice';
import React, { useEffect, useState } from 'react'
import { BsEmojiLaughing } from 'react-icons/bs';
import { useSelector } from 'react-redux';


const Page = () => {
    const { formData, budgets } = useSelector(state => state.budgetData);
    const { id } = useParams<{ id: string }>();
    const budgetdata = [budgets[id]]
    const { totalExpenses, remainingAmount } = useSelector((state: any) => selectBudgetSummary(state, id));
    const num = parseInt(remainingAmount);
    const orignalBudgetamount = totalExpenses + remainingAmount;
    console.log(totalExpenses, remainingAmount);
    const percentage = (num / orignalBudgetamount) * 100

    // const [expensedetails, setExpenseDetails] = useState([{

    // }]);



    // console.log(expensedetails);




    return (
        <>
            <h1 className='font-bold pb-5 text-xl'>My Expense</h1>
            <div className='pt-6 flex flex-wrap gap-10'>
                {budgetdata?.map((budget: any) => (
                    <div key={budget?.id} className="!w-1/2 h-36 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-6" >
                        <div className='flex justify-between'>
                            <div className='flex gap-2 items-center pt-5 pl-3'>
                                <BsEmojiLaughing size={30} />
                                <div>
                                    <h4 className='font-bold'>{budget?.budgetName}</h4>
                                    <p className='text-sm font-light'>1 item</p>
                                </div>
                            </div>
                            <div className='pt-7 mx-3'>
                                <h1>{budget?.budgetAmount}$</h1>
                            </div>
                        </div>
                        <div className='pt-6'>
                            <div className='flex justify-between mb-2 mx-4 '>
                                <p className='text-gray-300 fony-light text-xs'>${totalExpenses} spend</p>
                                <p className='text-gray-300 fony-light text-xs'>${remainingAmount} remaining</p>
                            </div>
                            <div className='mx-4'>
                                <Progress value={percentage} />
                            </div>
                        </div>
                    </div>
                ))}
                <AddExpense />
                <ExpenseTable />
            </div>

        </>

    )
}

export default Page;