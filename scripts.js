const addHoursToDate = (objDate, intHours) => {
    const numberOfMlSeconds = objDate.getTime();
    const addMlSeconds = (intHours * 60) * 60 * 1000;
    const newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
 
    return newDateObj;
}

const parseHoursMinutes = (timeAsString) => {
    const timeSplit = timeAsString.split(".")
    return [parseInt(timeSplit[0]), parseInt(timeSplit[1])]

}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded")

    document.getElementById("calculate-time-button").addEventListener("click", function(event) {
        // console.log(event)
        event.preventDefault()
        calculateMissingTime()
    })

    /*
    document.getElementById("start-time").addEventListener("change", event => {
        console.log(event)
    })
*/
    Array.from(document.getElementsByClassName("watch-change")).forEach(item => {
        item.addEventListener("keyup", () => calculateMissingTime())
        item.addEventListener("change", () => calculateMissingTime())
    })
    

    const calculateMissingTime = () => {
        console.log("calculateMissingTime triggered")
        const startTime = document.getElementById("start-time").value
        const [startTimeHours, startTimeMinutes] = parseHoursMinutes(startTime)

        const breakDuration = parseInt(document.getElementById("break-duration").value)

        const endTime = document.getElementById("end-time").value
        const [endTimeHours, endTimeMinutes] = parseHoursMinutes(endTime)

        const [workHours, workMinutes] = parseHoursMinutes(document.getElementById("work-hours").value)

        console.log("Start time:", startTimeHours, startTimeMinutes)
        console.log("Break:", breakDuration)
        console.log("End time:", endTimeHours, endTimeMinutes)
        console.log("Work hours",workHours, workMinutes)


    }

    const calculateEndTime = (startTime, breakDuration, workHours) => {
        const date = new Date()
        console.log(date)
        date.setHours(startTime)

    }
})