import { Button, Typography } from 'antd';
import { ReactNode } from 'react';
import { FallbackProps } from 'react-error-boundary';

const fallbackRender: (props: FallbackProps) => ReactNode = ({
  error,
  resetErrorBoundary,
}: {
  error: Record<'message', string>;
  resetErrorBoundary: FallbackProps['resetErrorBoundary'];
}) => {
  return (
    <div role="alert">
      <Typography.Text>Something went wrong:</Typography.Text>
      <pre className="text-red-500">{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
};

export default fallbackRender;
