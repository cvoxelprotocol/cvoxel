import { getWorkCredentialService } from "@/services/workCredential/WorkCredentialService";
import { useQuery } from "react-query";
import { Organization } from "@/__generated__/types/Organization";

export const useOrganization = (orgId?: string) => {
  const workCredentialService = getWorkCredentialService();

  const { data: organization, isLoading } = useQuery<Organization | null>(
    ["Organization", orgId],
    () => workCredentialService.fetchOrganization(orgId),
    {
      enabled: !!orgId,
      staleTime: Infinity,
      cacheTime: 30000,
    }
  );
  return {
    organization,
    isLoading,
  };
};
