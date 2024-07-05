// budgetdataSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BudgetDataState {
    budgets: Budget[];
    totalAmount: number
    expenses: any;


}

interface Budget {
    id: string;
    budgetAmount: number;

}

const initialState: BudgetDataState = {
    budgets: [],
    totalAmount: 0,
    expenses: [],

};

const budgetDataSlice = createSlice({
    name: 'budgetData',
    initialState,
    reducers: {
        setBudgets: (state, action: PayloadAction<Budget[]>) => {
            state.budgets = action.payload;
        },

        updateBudget: (state, action: PayloadAction<{ id: string, newTotalAmount: number }>) => {
            const index = state.budgets.findIndex(budget => budget.id === action.payload.id);
            if (index !== -1) {
                state.budgets[index].budgetAmount = action.payload.newTotalAmount;
            }
        },
        addBudget: (state, action: PayloadAction<Budget>) => {
            state.budgets.push(action.payload);
        },
        settotalAmount: (state, action) => {

            state.budgets = action.payload;
        },
        setExpenses: (state, action) => {
            state.expenses = action.payload;
        },

    },
});

export const { setBudgets, updateBudget, addBudget, settotalAmount, setExpenses } = budgetDataSlice.actions;

export default budgetDataSlice.reducer;
