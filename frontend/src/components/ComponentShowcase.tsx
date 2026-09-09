import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Input,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Card,
  InteractiveCard,
  Alert,
  StatusBadge,
  EmptyState,
  Skeleton,
  Spinner,
  Modal,
  Pagination,
} from './ui';
import { SectionTitle, BodyText, Caption } from './typography';
import { PageHeader } from './layout';
import { DashboardGrid, StatCard, QuickActions, ActivityList } from './dashboard';
import {
  MapContainer,
  MapMarker,
  MapPopup,
  UserLocationMarker,
  VehicleMarker,
  DisposalCenterMarker,
  RouteLine,
  MapLegend,
} from './maps';
import {
  WasteCategoryBadge,
  WasteCategoryCard,
  WasteItemCard,
  WasteInstruction,
} from './waste';
import { CollectionCard, CollectionStatus, CollectionTypeBadge } from './collection';
import { PickupCard, PickupStatus, PickupTimeline } from './pickup';
import { DisposalCenterCard } from './disposal';
import { ReportCard, ReportStatus } from './reports';
import { PointsCard, AchievementCard, LevelProgress } from './rewards';

export const ComponentShowcase: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [switchVal, setSwitchVal] = useState(true);
  const [radioVal, setRadioVal] = useState('residential');

  return (
    <div className="min-h-screen bg-canvas p-6 sm:p-10 max-w-7xl mx-auto space-y-12 font-sans text-content">
      {/* Header */}
      <PageHeader
        title="GreenCycle LK Component Library"
        subtitle="Reusable shared components built for Sri Lanka's smart waste management platform"
        breadcrumbs={[
          { label: 'Design System', href: '#' },
          { label: 'Component Gallery' },
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Documentation</Button>
            <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
              Test Modal Dialog
            </Button>
          </div>
        }
      />

      {/* Typography & Primitives */}
      <section className="space-y-6">
        <SectionTitle subtitle="Core buttons, form inputs, toggles and status indicators">
          1. UI Primitives & Typography
        </SectionTitle>

        <Card className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" loading>Loading</Button>
            <IconButton aria-label="Favorite" variant="secondary">
              ⭐
            </IconButton>
            <Spinner size="md" variant="secondary" />
          </div>

          <div>
            <BodyText>
              GreenCycle LK provides smart municipal waste routing and community recycling in Colombo, Kandy, and Galle.
            </BodyText>
            <Caption>System status: Active online • GPS Sync OK</Caption>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input placeholder="Enter pickup address..." />
            <Select
              placeholder="Select waste category..."
              options={[
                { label: 'Organic Waste', value: 'organic' },
                { label: 'Plastic Materials', value: 'plastic' },
                { label: 'Paper & Cardboard', value: 'paper' },
              ]}
            />
            <div className="flex flex-col gap-2">
              <Checkbox label="Organic segregated" defaultChecked />
              <Switch label="Notify truck arrival" checked={switchVal} onChange={setSwitchVal} />
            </div>
          </div>

          <RadioGroup label="Account Type" orientation="horizontal">
            <Radio
              name="type"
              label="Household"
              value="residential"
              checked={radioVal === 'residential'}
              onChange={() => setRadioVal('residential')}
            />
            <Radio
              name="type"
              label="Commercial Partner"
              value="commercial"
              checked={radioVal === 'commercial'}
              onChange={() => setRadioVal('commercial')}
            />
          </RadioGroup>

          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge variant="success" dot>Collected</StatusBadge>
            <StatusBadge variant="warning" dot>Pending</StatusBadge>
            <StatusBadge variant="error" dot>Missed</StatusBadge>
            <StatusBadge variant="info" dot>En Route</StatusBadge>
            <CollectionStatus status="SCHEDULED" size="sm" />
            <CollectionTypeBadge type="MUNICIPAL" size="sm" />
            <PickupStatus status="ASSIGNED" size="sm" />
            <ReportStatus status="VERIFIED" size="sm" />
            <WasteCategoryBadge category="ORGANIC" />
            <WasteCategoryBadge category="PLASTIC" />
            <WasteCategoryBadge category="PAPER" />
            <WasteCategoryBadge category="HAZARDOUS" />
          </div>

          <Alert
            variant="success"
            title="Collection Confirmed"
            onClose={() => {}}
          >
            Your scheduled recyclable pickup is assigned to Truck WP-CAD-4921.
          </Alert>

          <Pagination
            currentPage={currentPage}
            totalPages={5}
            totalItems={50}
            pageSize={10}
            showSummary
            onPageChange={setCurrentPage}
          />
        </Card>
      </section>

      {/* Interactive Cards & Skeletons */}
      <section className="space-y-6">
        <SectionTitle subtitle="Interactive elevations, empty states, and skeleton loaders">
          2. Interactive Cards & States
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InteractiveCard className="p-5 flex flex-col justify-between" onClick={() => {}}>
            <div>
              <span className="text-2xl">⚡</span>
              <h4 className="font-bold text-sm text-content mt-2">Interactive Card</h4>
              <p className="text-xs text-content-secondary mt-1">
                Hover to elevate and test keyboard Enter or click response.
              </p>
            </div>
            <span className="text-xs text-primary font-semibold mt-4">Click to inspect →</span>
          </InteractiveCard>

          <EmptyState
            title="No Pending Pickups"
            description="You have cleared all scheduled waste pickups for this week."
            action={<Button size="sm" variant="secondary">Book New Pickup</Button>}
          />

          <Card className="p-5 flex flex-col gap-3 justify-center">
            <Skeleton variant="text" width="60%" height={16} />
            <Skeleton variant="rectangular" height={60} />
            <div className="flex gap-2">
              <Skeleton variant="circular" width={28} height={28} />
              <Skeleton variant="text" width="40%" height={12} />
            </div>
          </Card>
        </div>
      </section>

      {/* Dashboard Widgets */}
      <section className="space-y-6">
        <SectionTitle subtitle="Key performance metrics, quick actions and activity feeds">
          3. Dashboard Widgets
        </SectionTitle>

        <DashboardGrid columns={4}>
          <StatCard
            title="Recycled This Month"
            value="128.4"
            unit="kg"
            icon={<span>♻️</span>}
            change={{ value: 14.2, isPositive: true, label: 'vs last month' }}
          />
          <StatCard
            title="GreenPoints"
            value="2,450"
            unit="pts"
            icon={<span>🌱</span>}
            change={{ value: 250, isPositive: true, label: 'earned this week' }}
          />
          <StatCard
            title="Pickups Completed"
            value="18"
            icon={<span>🚛</span>}
            change={{ value: '100%', label: 'on-time rate' }}
          />
          <StatCard
            title="CO2 Offset"
            value="64.2"
            unit="kg"
            icon={<span>🌍</span>}
            description="Equivalent to 3 planted trees"
          />
        </DashboardGrid>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <QuickActions
              actions={[
                { id: '1', label: 'Schedule Pickup', icon: <span>📅</span>, onClick: () => {} },
                { id: '2', label: 'Report Dumping', icon: <span>📸</span>, onClick: () => {}, badge: 'New' },
                { id: '3', label: 'Disposal Centers', icon: <span>📍</span>, onClick: () => {} },
                { id: '4', label: 'Redeem Points', icon: <span>🎁</span>, onClick: () => {} },
              ]}
            />
          </div>
          <ActivityList
            items={[
              {
                id: '1',
                title: 'Plastic Pickup Completed',
                description: 'Dehiwala-Mount Lavinia Ward 4',
                timestamp: '15m ago',
                status: { label: 'Done', variant: 'success' },
              },
              {
                id: '2',
                title: 'Truck En Route',
                description: 'Collector Jagath approaching Colombo 07',
                timestamp: '42m ago',
                status: { label: 'Live', variant: 'info' },
              },
            ]}
          />
        </div>
      </section>

      {/* Interactive Map */}
      <section className="space-y-6">
        <SectionTitle subtitle="Interactive Leaflet maps with live collection trucks and disposal centers">
          4. Smart Waste Geo-Tracking Maps
        </SectionTitle>

        <div className="relative rounded-2xl overflow-hidden shadow-card border border-border">
          <MapContainer center={[6.9271, 79.8612]} zoom={13} height="380px">
            <UserLocationMarker position={[6.9271, 79.8612]} title="My Home Location" />
            <MapMarker position={[6.9200, 79.8600]}>
              <MapPopup title="Drop-off Bin" description="Public dry recyclables bin" />
            </MapMarker>
            <VehicleMarker
              position={[6.9320, 79.8550]}
              plateNumber="WP-CAD-4921"
              status="en_route"
              heading={45}
            >
              <MapPopup
                title="Truck WP-CAD-4921"
                subtitle="Municipal Route Colombo Central"
                description="Currently collecting recyclable plastics along Galle Road."
              />
            </VehicleMarker>
            <DisposalCenterMarker
              position={[6.9150, 79.8700]}
              type="recycling"
              name="Colombo Community Recycling Depot"
            >
              <MapPopup
                title="Colombo Recycling Depot"
                subtitle="Accepts: Paper, Plastic, E-Waste"
                description="Open daily 8:00 AM - 5:00 PM"
              />
            </DisposalCenterMarker>
            <RouteLine
              positions={[
                [6.9150, 79.8700],
                [6.9220, 79.8650],
                [6.9320, 79.8550],
              ]}
              dashed
            />
          </MapContainer>
          <MapLegend position="bottom-left" />
        </div>
      </section>

      {/* Waste & Collection Cards */}
      <section className="space-y-6">
        <SectionTitle subtitle="Specialized cards for waste sorting, municipal schedules, and requests">
          5. Waste, Collection & Pickup
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WasteCategoryCard
            category="PLASTIC"
            title="Rigid & Soft Plastics"
            description="PET bottles, HDPE containers, cleaned food wrap and bags."
            guidelines={['Wash and rinse clean', 'Remove caps and rings', 'Flatten bottles']}
          />
          <WasteItemCard
            name="PET Water & Beverage Bottle"
            category="PLASTIC"
            icon="🥤"
            points={15}
            preparationTip="Rinse residue and crush before bagging."
          />
          <CollectionCard
            id="COL-2026-089"
            date="Tomorrow, Sep 10"
            timeWindow="08:00 AM - 11:00 AM"
            area="Colombo 03 - Kollupitiya"
            type="RECYCLING"
            status="SCHEDULED"
            wasteCategories={['PLASTIC', 'PAPER']}
            truckNumber="WP-CAD-4921"
            onTrack={() => {}}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PickupCard
            id="REQ-942"
            address="142/B Havelock Road, Colombo 05"
            scheduledDate="Today, Sep 09"
            timeSlot="02:00 PM - 04:00 PM"
            wasteCategories={['E_WASTE', 'METAL']}
            status="IN_PROGRESS"
            estimatedWeightKg={12}
            collectorName="Nimal Perera"
            onTrack={() => {}}
          />

          <Card className="p-5">
            <h4 className="text-sm font-bold text-content mb-4">Pickup Tracking Timeline</h4>
            <PickupTimeline
              steps={[
                { id: '1', label: 'Request Placed', timestamp: '08:30 AM', completed: true },
                { id: '2', label: 'Collector Nimal Assigned', timestamp: '09:15 AM', completed: true },
                { id: '3', label: 'Driver En Route to Colombo 05', timestamp: '01:45 PM', completed: false, current: true, note: 'Truck 1.4 km away' },
                { id: '4', label: 'Weigh-in & Collection', completed: false },
              ]}
            />
          </Card>
        </div>

        <WasteInstruction
          steps={[
            {
              stepNumber: 1,
              title: 'Empty & Rinse',
              description: 'Ensure food containers and beverage bottles are free of liquid and grease.',
              dos: ['Rinse with leftover greywater'],
              donts: ['Leave oily residues'],
            },
            {
              stepNumber: 2,
              title: 'Separate Streams',
              description: 'Place clean paper, plastics, and metals into designated color-coded bins.',
              dos: ['Flatten cardboard boxes'],
              donts: ['Mix organic kitchen waste'],
            },
            {
              stepNumber: 3,
              title: 'Check Schedule',
              description: 'Check your municipal ward collection day or book an on-demand pickup.',
              dos: ['Place bags out before 7:00 AM'],
              donts: ['Leave open waste bags on sidewalks'],
            },
            {
              stepNumber: 4,
              title: 'Earn GreenPoints',
              description: 'Receive verified eco points from the collection driver on weigh-in.',
              dos: ['Show digital QR code to driver'],
              donts: ['Contaminate clean batches'],
            },
          ]}
        />
      </section>

      {/* Disposal, Rewards & Reports */}
      <section className="space-y-6">
        <SectionTitle subtitle="Citizen engagement, eco-rewards, and community issue reports">
          6. Disposal, Rewards & Reports
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DisposalCenterCard
            id="DC-01"
            name="Mutwal Eco Drop-off Center"
            type="Recycling"
            address="Aluthmawatha Rd, Colombo 15"
            distanceKm={3.8}
            openingHours="Mon - Sat: 8:00 AM - 5:00 PM"
            isOpenNow={true}
            acceptedWaste={['PLASTIC', 'PAPER', 'GLASS']}
            onDirections={() => {}}
          />
          <PointsCard
            points={2450}
            tierName="Eco Warrior"
            expiringPoints={{ amount: 150, date: 'Oct 31, 2026' }}
            onRedeem={() => {}}
            onHistory={() => {}}
          />
          <AchievementCard
            title="Century Recycler"
            description="Diverted over 100 kg of recyclable materials from landfills."
            icon="🏆"
            unlocked={false}
            progress={{ current: 78, total: 100, unit: 'kg' }}
            rewardPoints={500}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ReportCard
            id="REP-504"
            title="Illegal Garbage Dumping on Canal Bank"
            issueType="Dumping"
            location="Wellawatte Canal Road, Colombo 06"
            submittedAt="3 hours ago"
            status="VERIFIED"
            upvotes={14}
            commentsCount={3}
            onUpvote={() => {}}
          />

          <LevelProgress
            currentLevel={3}
            levelTitle="Green Ambassador"
            currentXp={3400}
            nextLevelXp={5000}
            perks={[
              'Priority on-demand collection slot bookings',
              '10% discount vouchers with eco-friendly grocery partners',
              'Exclusive municipal composting workshop passes',
            ]}
          />
        </div>
      </section>

      {/* Test Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Eco-Pickup Confirmation"
        description="Verify your booking details before driver assignment"
      >
        <div className="space-y-4 text-sm">
          <p className="text-content-secondary">
            Your request for on-demand recyclable collection has been scheduled for{' '}
            <strong className="text-content">Tomorrow, Sep 10 at 09:00 AM</strong>.
          </p>
          <div className="p-3 bg-muted rounded-xl border border-border flex items-center gap-3">
            <span className="text-2xl">🌱</span>
            <div className="text-xs">
              <span className="font-semibold text-primary block">Expected GreenPoints</span>
              <span className="text-content-secondary">Earn up to 120 points for segregating plastics</span>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>
              Confirm Request
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
