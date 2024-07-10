const getExerciseConstants = async () => { 
    console.log("sending request");
    const res = await fetch('http://localhost:8080/exercise/defaults');
    return res.json();
}

export {
    getExerciseConstants
}