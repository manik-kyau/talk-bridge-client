const person = [
    { name: 'manik', age: 25, date: '8/6/2024' },
    { name: 'kinam', age: 26, date: '9/6/2025' },
    { name: 'hamim', age: 29, date: '8/6/2023' },
];

// Function to convert date string to Date object
const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
};

// Finding the newest date object
const newestPerson = person.reduce((latest, current) => {
    return parseDate(latest.date) > parseDate(current.date) ? latest : current;
});

console.log(newestPerson);