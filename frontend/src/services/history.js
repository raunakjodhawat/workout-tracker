const getHistoricalData = async(date) => {
    const res = await fetch(`http://localhost:8080/schedule/date/${date}`);
    return res.json();
}

const updateExistingSchedule = async(id, schedule) => {
    const res = await fetch(`http://localhost:8080/schedule/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(schedule)
    });
    if (res.ok) {
        return await res.json();
    } else throw new Error("Failed to update schedule");
};

export { getHistoricalData, updateExistingSchedule };