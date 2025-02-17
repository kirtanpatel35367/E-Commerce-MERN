import { filterOptions } from "@/config"
import { Checkbox } from "../ui/checkbox"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Separator } from "../ui/separator"


export function ProductFilter({ filter, handleFilter }) {
    return (
        <div className="bg-slate-800 text-white rounded-r-md shadow-sm">
            <div className="p-4 border-b">
                <h2>Filters</h2>
            </div>
            <div className="p-4 space-y-4">
                {

                    Object.keys(filterOptions).map((item) => <>
                        <div >
                            <h3 className="text-base font-bold">{item}</h3>
                            <div key={item} className="grid gap-2 mt-2">
                                {
                                    filterOptions[item].map((options) =>
                                        <>
                                            <Label className="flex items-center gap-2 font-normal">
                                                <Checkbox checked={filter && filter[item] && Object.keys(filter).length > 0 && filter[item].indexOf(options.id) > -1} onCheckedChange={() => handleFilter(item, options.id)} className='text-white bg-white' />
                                                {options.label}
                                            </Label>
                                        </>
                                    )
                                }
                            </div>
                            <Separator />
                        </div>
                    </>
                    )
                }
            </div>
        </div>
    )
}

