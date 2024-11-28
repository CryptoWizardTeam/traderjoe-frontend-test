import { useTranslation } from "@pancakeswap/localization";
import { Text, Button } from "@pancakeswap/uikit";
import { StyledActionContainer, ActionContent, ActionTitles } from "./styles";

export interface EnableStakeActionProps {
  pendingTx: boolean;
  handleApprove: () => void;
}

const EnableStakeAction: React.FunctionComponent<React.PropsWithChildren<EnableStakeActionProps>> = ({
  pendingTx,
  handleApprove,
}) => {
  const { t } = useTranslation();

  return (
    <StyledActionContainer>
      <ActionTitles>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {t("Enable Farm")}
        </Text>
      </ActionTitles>
      <ActionContent>
        <Button width="100%" disabled={pendingTx} onClick={handleApprove} variant="secondary">
          {t("Enable")}
        </Button>
      </ActionContent>
    </StyledActionContainer>
  );
};

export default EnableStakeAction;
