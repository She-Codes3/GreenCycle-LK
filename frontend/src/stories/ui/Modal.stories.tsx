import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal, ModalFooter, Button } from '@/components/ui';

const meta: Meta<typeof Modal> = {
  title: 'GreenCycle/UI/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Open: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="On-Demand Bulky Waste Pickup"
          description="Colombo Municipal Council Service"
        >
          <div className="space-y-3 text-sm text-content-secondary">
            <p>
              Your request for collecting an <strong>Old Rice Cooker (E-Waste)</strong> has been recorded.
            </p>
            <p>Estimated GreenPoints reward: <strong className="text-primary font-bold">+85 pts</strong>.</p>
          </div>
          <ModalFooter className="-mx-5 -mb-5 mt-4">
            <Button variant="secondary" size="sm" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsOpen(false)}>
              Confirm Dispatch
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

export const Closed: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Click to Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Citizen Verification"
        >
          <p className="text-sm">Modal content is closed by default.</p>
        </Modal>
      </div>
    );
  },
};

export const Confirmation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div>
        <Button variant="danger" onClick={() => setIsOpen(true)}>Cancel Scheduled Pickup</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="sm"
          title="Cancel Collection Request?"
        >
          <p className="text-sm text-content-secondary">
            Are you sure you want to cancel pickup #REQ-491? Your assigned truck CMB-4521 is already in route.
          </p>
          <ModalFooter className="-mx-5 -mb-5 mt-4">
            <Button variant="secondary" size="sm" onClick={() => setIsOpen(false)}>
              Keep Booking
            </Button>
            <Button variant="danger" size="sm" onClick={() => setIsOpen(false)}>
              Yes, Cancel Pickup
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Terms & Conditions</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="lg"
          title="Sri Lanka National Waste Segregation Terms"
          description="Ministry of Environment regulations (Gazette No. 2038/35)"
        >
          <div className="space-y-4 text-xs text-content-secondary leading-relaxed">
            <h5 className="font-bold text-sm text-content">1. Mandatory Source Segregation</h5>
            <p>
              Every household and commercial entity in Sri Lanka shall segregate solid waste into non-biodegradable recyclable waste (plastics, glass, paper, metals) and biodegradable organic waste prior to municipal collection.
            </p>
            <h5 className="font-bold text-sm text-content">2. Polyethylene & Plastic Regulations</h5>
            <p>
              Manufacture, sale, and use of single-use polythene bags under 20 microns is prohibited under the National Environmental Act. Recyclable plastics must be rinsed clean before collection.
            </p>
            <h5 className="font-bold text-sm text-content">3. Hazardous & Electronic Waste Handling</h5>
            <p>
              CFL bulbs, lithium-ion batteries, and electronic scrap must be handed exclusively to authorized GreenCycle drop-off centers and never disposed with municipal compost.
            </p>
            <h5 className="font-bold text-sm text-content">4. Community GreenPoints Policy</h5>
            <p>
              Verified recycling drops yield GreenPoints redeemable at participating utility service outlets and partner merchants across Sri Lanka.
            </p>
          </div>
          <ModalFooter className="-mx-5 -mb-5 mt-4">
            <Button variant="primary" size="sm" onClick={() => setIsOpen(false)}>
              I Accept & Agree
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};
