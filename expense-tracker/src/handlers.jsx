async function saveRecords(newRecord){
    //const id = records.length+1;
    //console.log(id);

    console.log("in handler" +newRecord); //for debugging
    let jsonString = JSON.stringify(newRecord)
    
    try {
        const response = await fetch("http://localhost:3001/expenses", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonString,
        })

        if (response.ok) {
            console.log("Saved successfully");
            return true;
        } else {
            console.log("Failed to save expense");
            return false;
        }
    } catch (error) {
        console.error("Error saving expense:", error);
        alert("Error saving expense.");
        return false;
    }


}

export default saveRecords;