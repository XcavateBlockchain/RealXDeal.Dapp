import { Shell } from '@/components/shell';
import UserStats from './_components/user-stats';
import { Card, TaskCard } from '@/components/cards/card';

export default function Page() {
  // const { address } = useSubstrateContext();
  // const [user, setUser] = useState<any>();
  // const [isLoading, setIsLoading] = useState(false);
  // const [lists, setLists] = useState<any>([]);

  // async function fetchData(address: string) {
  //   const boardList = await getLeadBoards();
  //   const userData = await getUserData(address);

  //   if (userData !== null && boardList !== null) {
  //     return { boardList, userData };
  //   }
  // }

  // const fetchUserDetails = useCallback(async () => {
  //   setIsLoading(true);
  //   const data = await fetchData(address);

  //   setUser(data?.userData);
  //   setLists(Array.isArray(data?.boardList) ? data?.boardList : []);
  //   setIsLoading(false);
  // }, [address]);

  // useEffect(() => {
  //   fetchUserDetails();
  // }, [fetchUserDetails]);

  return (
    <Shell>
      <UserStats />
      <Card title="Task">
        <div className="grid w-full grid-cols-3 gap-[14px]">
          <TaskCard
            type="x"
            title="Social media"
            description="Follow, retweet, like a tweet, or create memes with a hashtag."
          />
          <TaskCard
            type="x"
            title="Social media"
            description="Follow, retweet, like a tweet, or create memes with a hashtag."
          />
          <TaskCard
            type="x"
            title="Social media"
            description="Follow, retweet, like a tweet, or create memes with a hashtag."
          />
        </div>
      </Card>
    </Shell>
  );
}
