function Error({ message }: { message: string }) {
  return (
    <div className="text-red-600 text-center">
      <p className="py-2">{message}</p>
    </div>
  );
}

export default Error;
