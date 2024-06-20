import { ReactNode } from 'react';
import { ExpandingView } from '../ExpandingView';

interface CenteringViewProps {
  children: ReactNode;
}

export default function CenteringView({ children }: CenteringViewProps) {

  return (
    <ExpandingView style={{ justifyContent: "center", alignItems: "center" }}>
      {children}
    </ExpandingView>
  );
}
