export default function(estimation) {
    let template = '';
    for (let i = 0; i < estimation; i++) {
        template += `<span class="estimation-icon"></span>`;
    }
    return template;
}