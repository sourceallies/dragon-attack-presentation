namespace Backend
{
    public class Mutation
    {
        public int Decrement([Service] Query query)
        {
            return --query.Counter;
        }
    }
}