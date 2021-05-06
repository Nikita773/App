export function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;

    if (mins > 60 && mins % 60 === 0 || mins === 60) {
        return hours + "h";
    } else if (mins > 60) {
        return hours + "h" + " " + minutes + "m";
    } else {
        return minutes + "m";
    }
}

export function getDayFromDeadline(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    if (Number(today.replace(/\D+/g, "")) < Number(date.replace(/\D+/g, ""))) {
        return { month: months[+month - 1], day, overdue: false };
    } else {
        return { month: months[+month - 1], day, overdue: 'overdue' };
    }
}

export function calculateDiffDays(date) {
    const today = new Date();
    const timeDiff = Math.abs(today.getTime() - new Date(date).getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

export function createDateArr(days) {
    let model = Array(days).fill(0);
    model.forEach((day, index) => {
        let date = new Date();
        date.setDate(date.getDate() - index);
        let modelDate = date.toLocaleDateString().split('.').reverse();
        model[index] = modelDate.join('-');
    });
    return model;
}