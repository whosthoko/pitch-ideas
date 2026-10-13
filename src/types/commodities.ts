export type CommodityCategory = 'Energy' | 'Metals' | 'Agriculture' | 'Critical Minerals';

export interface CommodityItem {
  id: string;
  name: string;
  ticker: string;
  category: CommodityCategory;
  standardUnit: string;
  defaultVolume: number;
  benchmarkPrice: number; // USD per unit
  priceUnit: string;
  typicalCollarPct: number;
  incoterms: string[];
  specs: {
    grade: string;
    assayStandard: string;
    deliveryRegion: string;
    laycanDays: number;
  };
}

export interface BlindedEntity {
  blindedId: string;
  ephemeralPubKey: string;
  teeEnclaveAttestation: string;
  unmaskedLegalEntity?: {
    name: string;
    jurisdiction: string;
    leiCode: string;
    bankCoordinates: string;
    custodian: string;
    sgsCertificateId: string;
  };
}

export type NegotiationStepStatus = 'PENDING' | 'DISCOVERING' | 'ZK_POF_VERIFIED' | 'ZK_POP_VERIFIED' | 'COLLAR_NEGOTIATION' | 'TERMS_CONVERGED' | 'ESCROW_LOCKED' | 'UNMASKED' | 'FAILED';

export interface NegotiationMessage {
  id: string;
  timestamp: string;
  sender: 'BUYER_AGENT' | 'SELLER_AGENT' | 'ENCLAVE_KERNEL';
  type: 'DISCOVERY' | 'ZK_PROOF_OFFER' | 'ZK_VERIFICATION' | 'BID' | 'ASK' | 'COUNTER_OFFER' | 'CONVERGENCE' | 'ESCROW_LOCK' | 'UNMASKING';
  content: string;
  dataPayload?: {
    price?: number;
    volume?: number;
    laycanStart?: string;
    laycanEnd?: string;
    zkProofHash?: string;
    collarSpread?: number;
    statusBadge?: string;
  };
}

export interface ZkProofDetails {
  type: 'POF' | 'POP';
  title: string;
  circuitName: string;
  provingSystem: string;
  publicInputs: Record<string, string>;
  shieldedWitness: Record<string, string>;
  proofHash: string;
  verifiedAt: string;
  constraintsCount: number;
  verificationLatencyMs: number;
  status: 'SHIELDED' | 'VALID' | 'INVALID';
}

export interface BlindedOrder {
  id: string;
  timestamp: string;
  commodityId: string;
  side: 'BUY' | 'SELL';
  blindedAddress: string;
  volume: number;
  unit: string;
  indicativeCollar: {
    min: number;
    max: number;
  };
  deliveryPort: string;
  laycanWindow: string;
  pofStatus: boolean;
  popStatus: boolean;
  enclaveSecurityLevel: 'SGX-DCAP' | 'NITRO-TPM' | 'SEV-SNP';
}
