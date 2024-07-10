export default function SetToDropDownConvertor({options, label}) {
    return (
        <div>
            <label>{label}</label>
            <select>
                {Array.from(options).map((v, i) => (
                    <option key={i}>{v}</option>
                ))}
            </select>
        </div>
    );
}