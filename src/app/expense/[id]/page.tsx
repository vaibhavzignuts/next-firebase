'use client';
import { AddExpense } from '@/components/AddExpense';
import { ExpenseTable } from '@/components/ExpenseTable';
import { Progress } from '@/components/ui/progress';
import { useParams, useRouter } from 'next/navigation';

import React, { useEffect } from 'react'
import { BsEmojiLaughing } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { setBudgets } from '@/redux/budgetdata/budgetdataSlice';

import { db } from '@/lib/firebase';
import { MdDeleteOutline } from 'react-icons/md';

type collection = {
    budgetName: string,
    budgetAmount: number,
}


const Page = () => {
    const { id } = useParams<{ id: string }>();
    const { budgets } = useSelector((state: any) => state.budgetData);
    const dispatch = useDispatch();
    const router = useRouter();
    console.log(budgets);

    const totalAmount = budgets.map((item) => item.totalAmount)
    const remainingAmount = budgets.map((item) => item.budgetAmount)


    const percentage = (remainingAmount / totalAmount) * 100


    const handleDelete = async (budget: any) => {

        try {
            console.log('hi');
            const budgetRef = doc(db, 'budget', id);
            await deleteDoc(budgetRef);
            dispatch(setBudgets(budgets.filter(b => b.id !== id)));
            router.push('/budget')

        } catch (error) {
            console.error('Error deleting budget:', error);
        }
    };



    useEffect(() => {
        const getSpecificBudgetData = async () => {

            try {
                const docRef = doc(db, 'budget', id);
                const docSnap = await getDoc(docRef);

                const budget = {
                    id: docSnap.id,
                    ...docSnap.data(),
                }

                dispatch(setBudgets([budget]))

            } catch (error) {
                console.error("Error fetching budget data:", error.message);
            }
        };
        getSpecificBudgetData();
    }, []);

    return (
        <>
            <h1 className='font-bold pb-5 text-xl'>My Expense</h1>
            <div className='pt-6 flex flex-wrap gap-10'>
                {budgets && budgets.map((budget: any) => (
                    <div key={budget?.id} className="!w-1/2 h-44 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-6" >
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

                                <p className='text-gray-300 fony-light text-xs'>${budget?.budgetAmount}remaining</p>
                            </div>
                            <div className='mx-4'>
                                <Progress value={percentage} />
                                <div className='flex float-end pt-4'> <MdDeleteOutline onClick={handleDelete} className="text-red-500 text-3xl" />
                                </div>
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