import { useState } from "react";

export type FieldProps = {
  id: string;
  init?: string | number;
  type?: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string[];
  options?: {value: string, label: string}[];
  checked?: boolean;
}

export function Input({id, init="", type="text", label, placeholder=label, disabled=false, error} : FieldProps) {
    const [value, setValue] = useState(init)
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const helper = (type == "date" && value) ? new Date(value).toLocaleDateString('fr-FR', options) : undefined;
    
    return (
      <div>
        <div className="flex flex-col space-y-1">
          <label htmlFor={id} className="text-lg font-medium text-gray-700 dark:text-gray-200">{label}</label>
          <input type={type} id={id} name={id} placeholder={placeholder} disabled={disabled} value={value} onChange={e => { setValue(e.target.value)}}
            className="px-2 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent dark:bg-stone-700 dark:border-zinc-600 dark:[color-scheme:dark]"
          />
        </div>
        {helper &&
          <p className='px-2 text-xs text-gray-400'>{helper}</p>
        }
        {error?.map((value, index) => 
          <p key={index} className='px-2 text-xs text-red-400'>{value}</p>
        )}
      </div>
      
    )
}

export function Checkbox({id, checked=false, label, disabled=false} : FieldProps) {
  const [value, setValue] = useState(checked)
  
  return (
    <div className="py-1">
      <label htmlFor={id} className="inline-flex items-center dark:text-gray-200">
        <input type="checkbox" id={id} name={id} disabled={disabled} checked={value} onChange={e => { setValue(e.target.checked)}}
          className={disabled ? "" : "cursor-pointer"}
        />
        <span className={disabled ? "ml-2" : "ml-2 cursor-pointer"}>{label}</span>
      </label>
    </div>
  )
}

export function Textarea({id, init="", label, disabled=false, error} : FieldProps) {
  const [value, setValue] = useState(init)
  return (
    <div>
      <div className="flex flex-col space-y-1">
        <label htmlFor={id} className="text-lg font-medium text-gray-700 dark:text-gray-200">{label}</label>
        <textarea id={id} name={id} placeholder={label} disabled={disabled} value={value} onChange={e => { setValue(e.target.value)}}
          maxLength={5000}
          rows={7}
          className="px-2 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent dark:bg-stone-700 dark:border-zinc-600"
        >
        </textarea>
      </div>
      {error?.map((value, index) => 
        <p key={index} className='px-2 text-xs text-red-400'>{value}</p>
      )}
    </div>
    
  )
}

export function Select({id, init="", label, disabled=false, error, options} : FieldProps) {
  const [selectedValue, setSelectedValue] = useState(init)
  return (
    <div>
      <div className="flex flex-col space-y-1">
        <label htmlFor={id} className="text-lg font-medium text-gray-700 dark:text-gray-200">{label}</label>
        <select id={id} name={id} disabled={disabled} value={selectedValue} onChange={e => { setSelectedValue(e.target.value)}}
          className="px-2 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent dark:bg-stone-700 dark:border-zinc-600"
        >
        { options?.map( (option, index) => 
          <option key={index} value={option.value}>{option.label}</option>
        )}
        </select>
      </div>
      {error?.map((value, index) => 
        <p key={index} className='px-2 text-xs text-red-400'>{value}</p>
      )}
    </div>
    
  )
}