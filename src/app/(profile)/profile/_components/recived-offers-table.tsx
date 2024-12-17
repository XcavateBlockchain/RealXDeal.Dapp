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
import { HandleOffer } from './offer-action';

export function ReceivedOffersTable({ offers }: OfferTableProps) {
  return (
    <div className="w-full py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>From</TableHead>
            <TableHead>Offer</TableHead>
            <TableHead>Item</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offers ? (
            offers.length > 0 ? (
              offers.map(async (offer: OfferProps) => {
                const collection = await getCollection();
                const metadata = collection[offer.listingId];
                return (
                  <TableRow key={offer.offerId}>
                    <TableCell>{formatAddress(offer.owner)}</TableCell>
                    <TableCell>{metadata.collectionName}</TableCell>

                    <TableCell>#{offer.itemId}</TableCell>
                    <TableCell align="right">
                      <HandleOffer offerId={parseInt(offer.offerId)} type={0} />
                    </TableCell>
                    <TableCell align="right">
                      <HandleOffer offerId={parseInt(offer.offerId)} type={1} />
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
            )
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
