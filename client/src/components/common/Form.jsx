import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';


const CommonForm = ({ formControls, formData, setFormData, buttontext, onsubmit }) => {

    function renderInputsByComponentType(formControlItem) {
        let element = null;
        const value = formData[formControlItem.name] || ""


        switch (formControlItem.componentType) {
            case 'input':
                element = (<Input
                    name={formControlItem.name}
                    placeholder={formControlItem.placeholder}
                    id={formControlItem.name}
                    type={formControlItem.type}
                    onChange={(event) => setFormData({
                        ...formData,
                        [formControlItem.name]: event.target.value
                    })}
                ></Input>)
                break
            case 'select':
                element = (
                    <Select onValueChange={(value) =>
                        setFormData({
                            ...formData,
                            [formControlItem.name]: value
                        })
                    } value={value}>
                        <SelectTrigger>
                            <SelectValue placeholder={formControlItem.placeholder} />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{formControlItem.label}</SelectLabel>
                                {
                                    formControlItem.options && formControlItem.options.length != 0 ?
                                        formControlItem.options.map((option) =>
                                            <SelectItem key={option.id} value={option.id} >{option.label}</SelectItem>
                                        ) : <></>
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )
                break

            case 'textarea':
                element = (
                    <Textarea name={formControlItem.name} onChange={(event) => setFormData({
                        ...formData,
                        [formControlItem.name]: event.target.value
                    })} value={value} placeholder={formControlItem.placeholder}></Textarea>
                )
                break

            default:
                element = (<Input
                    name={formControlItem.name}
                    placeholder={formControlItem.placeholder}
                    id={formControlItem.name}
                    type={formControlItem.type}
                ></Input>)
        }

        return element

    }

    return (
        <>
            <form action="" onSubmit={onsubmit}>
                <div className='flex flex-col gap-3 font-HeadFont'>
                    {
                        formControls && formControls.map((controlItem) =>
                            <div key={controlItem.name} className='grid w-full space-y-3 '>
                                <Label>{controlItem.label}</Label>
                                {renderInputsByComponentType(controlItem)}
                            </div>
                        )
                    }
                    <Button  type="submit" >{buttontext || 'submit'}</Button>
                </div>

            </form>
        </>
    )
}

export default CommonForm 
