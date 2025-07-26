import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Dialog } from "../ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import AdminOrderDetails from "./Order-details"


function AdminOrdersview() {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

    return (
        <div>
            <Card >
                <CardHeader>
                    <CardTitle>
                        Order History
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
                                        <Button onClick={() => setOpenDetailsDialog(true)} >View Details</Button>
                                        <AdminOrderDetails />
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

export default AdminOrdersview