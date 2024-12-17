import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { getCollection } from '@/lib/queries';
import { formatAddress } from '@/lib/utils';
import { OfferProps, OfferTableProps } from '@/types';

export function SentOffersTable({ offers }: OfferTableProps) {
  return (
    <div className="w-full py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Offer</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offers.length > 0 ? (
            offers.map(async (offer: OfferProps) => {
              const collection = await getCollection();
              const metadata = collection[offer.listingId];
              return (
                <TableRow key={offer.offerId}>
                  <TableCell>#{offer.offerId}</TableCell>
                  <TableCell>{metadata.collectionName}</TableCell>
                  <TableCell>{formatAddress(offer.owner)}</TableCell>
                  <TableCell className="text-[#FF8A00]">Pending</TableCell>
                  <TableCell align="right">
                    <Button variant="outline" size={'md'}>
                      Withdraw
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No property.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
