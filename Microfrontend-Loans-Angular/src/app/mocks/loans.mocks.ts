import { Loan } from "../interfaces/loans.interface";

export const LOANS_MOCK: Loan[] = [
    {
        id: 1,
        userId: 101,
        userName: 'Carlos Ramírez',
        bookId: 51,
        bookTitle: 'Clean Code',
        loanDate: '2026-10-10',
        returnDate: '2026-10-20',
        status: 'ACTIVE',
        amount: 5000,
    },
    {
        id: 2,
        userId: 102,
        userName: 'Ana Gómez',
        bookId: 52,
        bookTitle: 'Design Patterns',
        loanDate: '2026-10-05',
        returnDate: '2026-10-15',
        status: 'RETURNED',
        amount: 3200,
    }
];