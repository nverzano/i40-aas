import { config } from 'dotenv';
console.log(config({ path: 'tests/.env' }));
import { expect } from 'chai';
import { readRecordBySemanticProtocolAndRole, getEndpointsByFrame } from '../src/services/registry/registry-api';
import { ConversationMember } from 'i40-aas-objects';

describe('read endpoints from pg', function() {
  it('returns endpoints by role', async function() {
    var x = await readRecordBySemanticProtocolAndRole('i40:registry-semanticProtocol/onboarding', 'Approver');
    expect(x)
      .to.be.an('array')
      .with.length.greaterThan(0);
  });
});

describe('read endpoints from pg', function() {
  it('returns an emptry array', async function() {
    var x = await readRecordBySemanticProtocolAndRole('notExisting', 'Approver');
    expect(x)
      .to.be.an('array')
      .with.length(0);
  });
});

describe('read endpoints from pg by frame', function() {
  it('returns endpoints by role', async function() {
    var x = await getEndpointsByFrame({
      type: 'publishInstance',
      messageId: '',
      conversationId: '27c4080d-6fd2-4a70-bf-1123as2wed2',
      semanticProtocol: 'i40:registry-semanticProtocol/onboarding',
      sender: new ConversationMember({
        identification: {
          id: 'https://i40-test-aas-server.cfapps.eu10.hana.ondemand.com/aas',
          idType: 'Custom'
        },
        role: {
          name: 'Operator'
        }
      }),
      receiver: new ConversationMember({
        role: {
          name: 'Approver'
        }
      }),
      replyBy: 1566200134680
    });
    expect(x)
      .to.be.an('array')
      .with.length.greaterThan(0);
  });
});

describe('read endpoints from pg by frame', function() {
  it('returns endpoints by id', async function() {
    var x = await getEndpointsByFrame({
      type: 'publishInstance',
      messageId: '',
      conversationId: '27c4080d-6fd2-4a70-bf-1123as2wed2',
      semanticProtocol: 'i40:registry-semanticProtocol/onboarding',
      sender: new ConversationMember({
        identification: {
          id: 'https://i40-test-aas-server.cfapps.eu10.hana.ondemand.com/aas',
          idType: 'Custom'
        },
        role: {
          name: 'Operator'
        }
      }),
      receiver: new ConversationMember({
        identification: {
          id: 'https://i40-test-aas-server.cfapps.eu10.hana.ondemand.com/aas',
          idType: 'Custom'
        },
        role: {
          name: 'Approver'
        }
      }),
      replyBy: 1566200134680
    });
    expect(x)
      .to.be.an('array')
      .with.length.greaterThan(0);
  });
});

describe('read endpoints from pg by frame with wrong role', function() {
  it('returns empty array', async function() {
    var x = await getEndpointsByFrame({
      type: 'publishInstance',
      messageId: '',
      conversationId: '27c4080d-6fd2-4a70-bf-1123as2wed2',
      semanticProtocol: 'i40:registry-semanticProtocol/onboarding',
      sender: new ConversationMember({
        identification: {
          id: 'https://i40-test-aas-server.cfapps.eu10.hana.ondemand.com/aas',
          idType: 'Custom'
        },
        role: {
          name: 'Operator'
        }
      }),
      receiver: new ConversationMember({
        role: {
          name: 'DoesNotExists'
        }
      }),
      replyBy: 1566200134680
    });
    expect(x)
      .to.be.an('array')
      .with.length(0);
  });
});

describe('read endpoints from pg by frame with wrong semanticProtocol', function() {
  it('returns empty array', async function() {
    var x = await getEndpointsByFrame({
      type: 'publishInstance',
      messageId: '',
      conversationId: '27c4080d-6fd2-4a70-bf-1123as2wed2',
      semanticProtocol: 'doesNotExists',
      sender: new ConversationMember({
        identification: {
          id: 'https://i40-test-aas-server.cfapps.eu10.hana.ondemand.com/aas',
          idType: 'Custom'
        },
        role: {
          name: 'Operator'
        }
      }),
      receiver: new ConversationMember({
        role: {
          name: 'Approver'
        }
      }),
      replyBy: 1566200134680
    });
    expect(x)
      .to.be.an('array')
      .with.length(0);
  });
});
