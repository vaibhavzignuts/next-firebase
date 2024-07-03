'use client';
import React, { useState } from 'react';
import { BsEmojiLaughing } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { AiOutlineRight } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress"
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, addBudget } from '@/redux/budgetdata/budgetdataSlice';

const Page = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { formData, budgets } = useSelector((state: any) => state.budgetData);

    const [formErrors, setFormErrors] = useState({ budgetName: '', budgetAmount: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setFormData({ [name]: value }));
    }

    const validateForm = () => {
        let valid = true;
        const errors = { budgetName: '', budgetAmount: '' };

        if (!formData.budgetName.trim()) {
            errors.budgetName = 'Budget Name is required';
            valid = false;
        }

        if (isNaN(formData.budgetAmount) || formData.budgetAmount <= 0) {
            errors.budgetAmount = 'Budget Amount must be a valid number greater than 0';
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const newBudget = {
            budgetName: formData.budgetName,
            budgetAmount: parseFloat(formData.budgetAmount),
        };

        dispatch(addBudget(newBudget));

        // Reset form after submission
        dispatch(setFormData({ budgetName: '', budgetAmount: '' }));
    }

    const handleBudgetClick = (id: any) => {
        console.log('hi');
        router.push(`/expense/${id}`);
    }

    return (
        <div>
            <h1 className='font-bold pb-5 text-xl'>My Budget</h1>
            <Dialog>
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
                                    value={formData?.budgetName}
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
                                    value={formData?.budgetAmount}
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
                {budgets?.map((budget: any, index: any) => (
                    <div key={index} className="w-96 h-36 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mb-6 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-50" onClick={() => handleBudgetClick(index)}>
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
                        <div className='flex float-end pt-12'><AiOutlineRight /></div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
