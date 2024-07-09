// Page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { addBudget, setBudgets, } from '@/redux/budgetdata/budgetdataSlice';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AiOutlineRight } from 'react-icons/ai';
import { BsEmojiLaughing } from 'react-icons/bs';
import Loader from '@/components/Loader';
import { toast } from "react-toastify";

const Page = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ budgetName: '', budgetAmount: '' });
    const [formErrors, setFormErrors] = useState({ budgetName: '', budgetAmount: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { budgets } = useSelector((state: any) => state.budgetData);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showEmptyCard, setShowEmptyCard] = useState(true);
    const user = auth.currentUser;



    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowEmptyCard(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (!user) {
            router.replace('/login')
            return;
        }

        const fetchBudgets = async () => {
            try {
                setIsLoading(true)

                console.log('api');
                console.log(user);
                const collectionRef = collection(db, 'users', user.uid, 'budgets');
                const querySnapshot = await getDocs(collectionRef);
                const budgetsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                dispatch(setBudgets(budgetsData));

                setIsLoading(false)

            } catch (error: any) {
                console.log(error.message);
            } finally {
                setIsLoading(false)
            }


        }

        auth.currentUser && fetchBudgets();





    }, [auth.currentUser]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    const validateForm = () => {
        let valid = true;
        const errors = { budgetName: '', budgetAmount: '' };

        if (!formData.budgetName.trim()) {
            errors.budgetName = 'Budget Name is required';
            valid = false;
        }

        if (isNaN(parseFloat(formData.budgetAmount)) || parseFloat(formData.budgetAmount) <= 0) {
            errors.budgetAmount = 'Budget Amount must be a valid number greater than 0';
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };


    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     if (!validateForm()) {
    //         return;
    //     }

    //     const newBudget = {
    //         budgetName: formData.budgetName,
    //         totalAmount: parseFloat(formData.budgetAmount),
    //         budgetAmount: parseFloat(formData.budgetAmount),
    //     };

    //     try {
    //         const collectionRef = collection(db, 'budget');
    //         const docRef = await addDoc(collectionRef, newBudget);
    //         // dispatch(settotalAmount(newBudget))
    //         dispatch(addBudget({ id: docRef.id, ...newBudget }));
    //         setFormData({ budgetName: '', budgetAmount: '' });
    //     } catch (error) {
    //         console.error('Error adding budget:', error.message);
    //     }
    // };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const newBudget = {
            budgetName: formData.budgetName,
            totalAmount: parseFloat(formData.budgetAmount),
            budgetAmount: parseFloat(formData.budgetAmount),
        };

        try {

            if (!user) {
                throw new Error('User not authenticated');
            }

            const userBudgetsRef = collection(db, 'users', user.uid, 'budgets');
            const docRef = await addDoc(userBudgetsRef, newBudget);

            dispatch(addBudget({ id: docRef.id, ...newBudget }));
            setFormData({ budgetName: '', budgetAmount: '' });
            setIsDialogOpen(false);
            toast.success('Budgets added successfully')
        } catch (error: any) {
            toast.error('Error fetching budgets:', error);
        }
    };

    const handleBudgetClick = (id: string) => {
        router.push(`/expense/${id}`);
    };

    return (
        <div>
            <h1 className='font-bold pb-5 text-xl'>My Budget</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger className='w-full h-36 ' asChild>
                    <Button variant="outline">+ Create New Budget</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-row-4 items-center gap-4">
                                <Label htmlFor="budgetName">
                                    Budget Name
                                </Label>
                                <Input
                                    placeholder='e.g. home-rent'
                                    id="budgetName"
                                    name="budgetName"
                                    className="col-span-3"
                                    value={formData.budgetName}
                                    onChange={handleInputChange}
                                />
                                {formErrors.budgetName && (
                                    <p className="text-red-500 text-xs mt-1">{formErrors.budgetName}</p>
                                )}
                            </div>
                            <div className="grid grid-row-4 items-center gap-4">
                                <Label htmlFor="budgetAmount">
                                    Budget Amount
                                </Label>
                                <Input
                                    placeholder='e.g. 3000$'
                                    id="budgetAmount"
                                    name="budgetAmount"
                                    className="col-span-3"
                                    type="number"
                                    value={formData.budgetAmount}
                                    onChange={handleInputChange}
                                />
                                {formErrors.budgetAmount && (
                                    <p className="text-red-500 text-xs mt-1">{formErrors.budgetAmount}</p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button className='w-full' type="submit">Create a Budget</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <div className='pt-16 flex flex-wrap gap-10'>
                {isLoading ? (
                    <div className="flex items-center justify-center mx-auto"><Loader /></div>
                ) : budgets?.length === 0 ? (
                    <div className="w-96 h-36 max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mb-6 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-50">
                        <div className='flex justify-center items-center h-full'>
                            <p className='text-gray-500'>You have not created any budgets yet.</p>
                        </div>
                    </div>
                ) : (
                    budgets.map((budget: any, index: number) => (
                        <div key={index} className="w-96 h-36 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mb-6 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-50" onClick={() => handleBudgetClick(budget.id)}>
                            <div className='flex justify-between p-3'>
                                <div className='flex gap-2 items-center'>
                                    <BsEmojiLaughing size={30} />
                                    <div>
                                        <h4 className='font-bold'>{budget?.budgetName}</h4>
                                        <p className='text-sm font-light'>1 item</p>
                                    </div>
                                </div>
                                <div>
                                    <h1 className='text-center'>{budget?.budgetAmount}$</h1>
                                </div>
                            </div>

                            <div className='flex float-end pt-10'><AiOutlineRight className=" text-3xl" /></div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Page;
