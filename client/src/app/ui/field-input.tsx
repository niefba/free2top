interface InputProps {
    id: string;
    name?: string;
    type?: string;
    label: string;
    disabled?: boolean;
    error?: string[];
}
export default function FieldInput({id, name=id, type="text", label, disabled=false, error} : InputProps) {
    return (
      <div>
        <div className="flex flex-col space-y-1">
          <label htmlFor={id} className="text-lg font-medium text-gray-700">{label}</label>
          <input type={type} id={id} name={name} placeholder={label} disabled={disabled}
            className="px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
          />
        </div>
        {error?.map((value, index) => 
          <p key={index} className='text-xs text-red-400'>{value}</p>
        )}
      </div>
      
    )
}