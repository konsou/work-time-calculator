const addHoursToDate = (objDate, intHours) => {
    const numberOfMlSeconds = objDate.getTime();
    const addMlSeconds = (intHours * 60) * 60 * 1000;
    const newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
 
    return newDateObj;
}

const parseHoursMinutes = (timeAsString) => {
    const timeSplit = timeAsString.split(".")
    const hours = parseInt(timeSplit[0])
    const minutes = parseInt(timeSplit[1])
    return [hours ? hours : 0, minutes ? minutes : 0]
}

class TimeValue {
    hours
    minutes
    lastModifiedTimestamp
    constructor(hours, minutes){
        this.hours = hours + (parseInt(minutes / 60))
        this.minutes = minutes % 60
        this.lastModifiedTimestamp = Date.now()
    }

    asHours(){
        return this.hours + (this.minutes / 60)
    }

    asMinutes(){
        return (this.hours * 60) + this.minutes
    }

    add(otherTimeValue){
        const totalMinutes = this.asMinutes() + otherTimeValue.asMinutes()
        const newHours = parseInt(totalMinutes / 60)
        const newMinutes = totalMinutes % 60
        return new TimeValue(newHours, newMinutes)        
    }

    subtract(otherTimeValue){
        const totalMinutes = this.asMinutes() - otherTimeValue.asMinutes()
        const newHours = parseInt(totalMinutes / 60)
        const newMinutes = totalMinutes % 60
        return new TimeValue(newHours, newMinutes)
    }
}

const decideWhichFieldToCalculate = (startTime, breakDuration, endTime, workHours) => {
    const numberOfNans = 1
}

const calculateMissingTime = () => {
    console.log("calculateMissingTime triggered")
    const startTimeFormValue = document.getElementById("start-time").value
    const startTime = startTimeFormValue 
                        ? new TimeValue(...parseHoursMinutes(startTimeFormValue))
                        : null

    const breakDuration = new TimeValue(0, parseInt(document.getElementById("break-duration").value))

    const endTimeFormValue = document.getElementById("end-time").value
    const [endTimeHours, endTimeMinutes] = parseHoursMinutes(endTimeFormValue)
    const endTime = new TimeValue(endTimeHours, endTimeMinutes)

    const [workHours, workMinutes] = parseHoursMinutes(document.getElementById("work-hours").value)
    const workTime = new TimeValue(workHours, workMinutes)

    console.log("Start time:", startTime, startTime?.asHours(), startTime?.asMinutes())
    console.log("Break:", breakDuration)
    console.log("End time:", endTime)
    console.log("Work hours", workTime)
    
    console.log("Start + break:", startTime.add(breakDuration))

    //calculateEndTime([startTimeHours, startTimeMinutes], breakDuration, [workHours, workMinutes])


}

const calculateEndTime = (startTime, breakDuration, workTime) => {
    const date = new Date()
    console.log(date)
    date.setHours(startTime[0])
    date.setMinutes(startTime[1])
    date.setSeconds(0)
    console.log(date)
    const interimDate = addHoursToDate(date, breakDuration / 60)
    console.log(interimDate)
    const finalDate = addHoursToDate(interimDate, workTime[0] + (workTime[1] / 60))
    console.log(finalDate)

}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded")

    document.getElementById("calculate-time-button").addEventListener("click", (event) => {
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
    

})