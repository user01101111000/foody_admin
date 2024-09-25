import OfferContainer from "../../containers/offers/OfferContainer";
import useGetAllOffersQuery from "../../hooks/api/useGetAllOffersQuery";
import timeSorter from "../../utils/timeSorter";
import OfferLoading from "../../containers/offers/OfferLoading";
import ErrorComponentForReactQuery from "../../components/ErrorElement";

const Offer = () => {
  const { data, isLoading, isError } = useGetAllOffersQuery();

  if (isLoading) return <OfferLoading />;

  if (isError) return <ErrorComponentForReactQuery />;

  const offers = timeSorter(data).map((x) => x.fields);

  return <OfferContainer offers={offers} />;
};

export default Offer;
