const getAllSetTypes = async () => {
    const res = await fetch('http://localhost:8080/schedule/defaults/types');
    return res.json();
}

const addASchedule = async (schedule) => {
    const res = await fetch('http://localhost:8080/schedule/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(schedule)
    });
    if (res.ok) {
        return await res.json();
    } else throw new Error("Failed to add schedule");
}
export { getAllSetTypes, addASchedule };