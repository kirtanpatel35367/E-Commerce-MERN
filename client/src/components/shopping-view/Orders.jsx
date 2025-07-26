import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Dialog } from "../ui/dialog"
import { Button } from "../ui/button"
import ShoppingOrderDetails from "./Order-Details"


function ShoppingOrderView() {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    return (
        <div>
            <Card className="font-HeadFont mt-4">
                <CardHeader>
                    <CardTitle>
                        Your Orders
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Order Date</TableHead>
                                <TableHead>Order Status</TableHead>
                                <TableHead>Order Price</TableHead>
                                <TableHead>
                                    <span className='sr-only'>Details</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>EZ1123</TableCell>
                                <TableCell>28/09/2025</TableCell>
                                <TableCell>Pending</TableCell>
                                <TableCell>90000</TableCell>
                                <TableCell>
                                    <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                                        <Button className="bg-[#682c0d] hover:bg-[#682b0dd6]" onClick={() => setOpenDetailsDialog(true)} >View Details</Button>
                                        <ShoppingOrderDetails />
                                    </Dialog>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )

}

export default ShoppingOrderView