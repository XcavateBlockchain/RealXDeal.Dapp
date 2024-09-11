import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const invoices = [
  {
    invoice: '1Ay00011DY...',
    paymentStatus: 'Red',
    totalAmount: '#4',
    paymentMethod: 'Credit Card'
  },
  {
    invoice: '1Ay00011DY...',
    paymentStatus: 'Red',
    totalAmount: '#1',
    paymentMethod: 'PayPal'
  },
  {
    invoice: '1Ay00011DY...',
    paymentStatus: 'Green',
    totalAmount: '#0',
    paymentMethod: 'Bank Transfer'
  }
];

export function ReceivedOffersTable() {
  return (
    <div className="w-full py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>From</TableHead>
            <TableHead>Offer</TableHead>
            <TableHead>Item</TableHead>
            {/* <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Status</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map(invoice => (
            <TableRow key={invoice.invoice}>
              <TableCell>{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">Accepts</TableCell>
              <TableCell className="text-right">Reject</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
