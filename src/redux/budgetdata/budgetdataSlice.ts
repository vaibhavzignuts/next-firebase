import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Budget {
    id: number;
    budgetName: string;
    budgetAmount: number;
    expenses: number;
}

interface ExpenseDetail {
    id: number;
    expenseName: string;
    expenseAmount: number;
}

interface BudgetDataState {
    formData: {
        budgetName: string;
        budgetAmount: number;
    };
    expenses: ExpenseDetail[];
    budgets: Budget[];
    originalBudget: number;
}

let nextBudgetId = 0;
let nextExpenseId = 0;

const initialState: BudgetDataState = {
    formData: {
        budgetName: '',
        budgetAmount: 0,
    },
    expenses: [],
    budgets: [],
    originalBudget: 0
};

const calculateBudgetSummary = (budget: Budget) => {
    const totalExpenses = budget.expenses;
    const remainingAmount = budget.budgetAmount - totalExpenses;
    return {
        totalExpenses,
        remainingAmount,
    };
};

const budgetdataSlice = createSlice({
    name: 'budgetData',
    initialState,
    reducers: {
        setFormData(state, action: PayloadAction<{ budgetName: string; budgetAmount: number }>) {
            state.formData = {
                ...state.formData,
                ...action.payload,
            };
        },
        setExpenseDetails(state, action: PayloadAction<{ id: number; expenseName: string; expenseAmount: number }>) {
            const { id, expenseName, expenseAmount } = action.payload;
            state.expenses.push({
                id: nextExpenseId++,
                id,
                expenseName,
                expenseAmount,
            });
        },
        addBudget(state, action: PayloadAction<{ budgetName: string; budgetAmount: number }>) {
            const { budgetName, budgetAmount } = action.payload;
            state.budgets.push({
                id: nextBudgetId++,
                budgetName,
                budgetAmount,
                expenses: 0,
            });
        },
        addExpense(state, action: PayloadAction<{ id: number; expenseAmount: number }>) {
            const { id, expenseAmount } = action.payload;
            const budget = state.budgets.find(b => b.id == id);
            if (budget) {
                budget.expenses += expenseAmount;
            }
        },
    },
});

export const { setFormData, addBudget, addExpense, setExpenseDetails } = budgetdataSlice.actions;

export const selectBudgetById = (state: { budgetData: BudgetDataState }, id: number) =>
    state.budgetData.budgets.find(budget => budget.id == id);

export const selectExpensesByBudgetId = (state: { budgetData: BudgetDataState }, id: number) =>
    state.budgetData.expenses.filter(expense => expense.id == id);



export const selectBudgetSummary = (state: { budgetData: BudgetDataState }, id: number) => {
    const budget = state.budgetData.budgets.find(budget => budget.id == id);

    if (budget) {
        return calculateBudgetSummary(budget);
    }
    return { totalExpenses: 0, remainingAmount: 0 };
};

export default budgetdataSlice.reducer;
