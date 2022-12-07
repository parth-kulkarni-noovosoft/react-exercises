interface ILabelProps {
    required?: boolean
    label: string
}

const Label: React.FC<ILabelProps> = ({ label, required }) => {
    const RequiredSymbol = required
        ? <span className="text-danger">*</span>
        : null;

    return <label>{label}{RequiredSymbol}</label>
}

export default Label;