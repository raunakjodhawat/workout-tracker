import styles from './setToDropDownConvertor.module.css';

export default function SetToDropDownConvertor({options, label}) {
    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>
            <select className={styles.select} required>
                <option value="">Select an option</option>
                {Array.from(options).map((v, i) => (
                    <option key={i}>{v}</option>
                ))}
            </select>
        </div>
    );
}