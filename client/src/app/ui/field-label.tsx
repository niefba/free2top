import { useState } from "react";

interface FieldProps {
    id: string;
    init?: string;
    name?: string;
    type?: string;
    label: string;
    disabled?: boolean;
    error?: string[];
}

export default function Input({id, init="", name=id, type="text", label, disabled=false, error} : FieldProps) {
    const [value, setValue] = useState(init)
    return (
      <div>
        <div className="flex flex-col space-y-1">
          <label htmlFor={id} className="text-lg font-medium text-gray-700">{label}</label>
          <input type={type} id={id} name={name} placeholder={label} disabled={disabled} value={value} onChange={e => { setValue(e.target.value)}}
            className="px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
          />
        </div>
        {error?.map((value, index) => 
          <p key={index} className='text-xs text-red-400'>{value}</p>
        )}
      </div>
      
    )
}

export function Textarea({id, init="", name=id, label, disabled=false, error} : FieldProps) {
  const [value, setValue] = useState(init)
  return (
    <div>
      <div className="flex flex-col space-y-1">
        <label htmlFor={id} className="text-lg font-medium text-gray-700">{label}</label>
        <textarea id={id} name={name} placeholder={label} disabled={disabled} value={value} onChange={e => { setValue(e.target.value)}}
          className="px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
        >
        </textarea>
      </div>
      {error?.map((value, index) => 
        <p key={index} className='text-xs text-red-400'>{value}</p>
      )}
    </div>
    
  )
}