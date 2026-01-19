import type { ComponentType } from 'react';

import type { SmartFaceComponentNamesType } from '../types/SmartFaceComponentsType';
import { CommentListAdapter } from './application/cd/CommentListAdapter';
import { DataWidgetAdapter } from './application/hrworks-admin/DataWidgetAdapter';
import { HrworksAdminLayoutAdapter } from './application/hrworks-admin/HrworksAdminLayoutAdapter';
import { HrworksAdminLayoutProfileImageAdapter } from './application/hrworks-admin/HrworksAdminLayoutProfileImageAdapter';
import { HrworksUserWhatsNewAdapter } from './application/hrworks-user/HrworksUserWhatsNewAdapter';
import { SqwClockInButtonAdapter } from './application/hrworks-user/SqwClockInButtonAdapter';
import { SqwDropdownMenuAdapter } from './application/hrworks-user/SqwDropdownMenuAdapter';
import { SqwLayoutAdapter } from './application/hrworks-user/SqwLayoutAdapter';
import { SqwProfileMenuAdapter } from './application/hrworks-user/SqwProfileMenuAdapter';
import { SqwSearchFieldAdapter } from './application/hrworks-user/SqwSearchFieldAdapter';
import { SqwSupportMenuAdapter } from './application/hrworks-user/SqwSupportMenuAdapter';
import { CmdTableAdapter } from './application/onboarding/CmdTableAdapter';
import { OnboardingControllerAdapter } from './application/onboarding/OnboardingControllerAdapter';
import { OnboardingLoginPageAdapter } from './application/onboarding/OnboardingLoginPageAdapter';
import { OnboardingWelcomePageAdapter } from './application/onboarding/OnboardingWelcomePageAdapter';
import { VerticalNavigationAdapter } from './application/onboarding/VerticalNavigationAdapter';
import { AccordionAdapter } from './core/AccordionAdapter';
import { AlertAdapter } from './core/AlertAdapter';
import { AudioSideEffectAdapter } from './core/AudioSideEffectAdapter';
import { BackendRequestSideEffectAdapter } from './core/BackendRequestSideEffectAdapter';
import { BadgeAdapter } from './core/BadgeAdapter';
import { BlankLayoutAdapter } from './core/BlankLayoutAdapter';
import { BreadcrumbAdapter } from './core/BreadcrumbAdapter';
import { ButtonAdapter } from './core/ButtonAdapter';
import { CardAdapter } from './core/CardAdapter';
import { CheckboxAdapter } from './core/CheckboxAdapter';
import { CheckboxGroupAdapter } from './core/CheckboxGroupAdapter';
import { ClassicLayoutAdapter } from './core/ClassicLayoutAdapter';
import { CollapsibleMenuAdapter } from './core/CollapsibleMenuAdapter';
import { ComboBoxAdapter } from './core/ComboBoxAdapter';
import { ContainerAdapter } from './core/ContainerAdapter';
import { DateFieldAdapter } from './core/DateFieldAdapter';
import { DateRangeFieldAdapter } from './core/DateRangeFieldAdapter';
import { DecimalFieldAdapter } from './core/DecimalFieldAdapter';
import { DropdownMenuAdapter } from './core/DropdownMenuAdapter';
import { DropzoneAdapter } from './core/DropzoneAdapter';
import { FileManagerAdapter } from './core/FileManagerAdapter';
import { FlexboxAdapter } from './core/FlexboxAdapter';
import { FontAwesomeIconAdapter } from './core/FontAwesomeIconAdapter';
import { FormAdapter } from './core/FormAdapter';
import { FormTextAdapter } from './core/FormTextAdapter';
import { GridAdapter } from './core/GridAdapter';
import { IconButtonAdapter } from './core/IconButtonAdapter';
import { IframeAdapter } from './core/IframeAdapter';
import { ImageAdapter } from './core/ImageAdapter';
import { IntegerFieldAdapter } from './core/IntegerFieldAdapter';
import { InternalServerErrorAdapter } from './core/InternalServerErrorAdapter';
import { KeyDownSideEffectAdapter } from './core/KeyDownSideEffectAdapter';
import { ListAdapter } from './core/ListAdapter';
import { LoadingAnimationAdapter } from './core/LoadingAnimationAdapter';
import { LoadingOverlayAdapter } from './core/LoadingOverlayAdapter';
import { MaterialDesignIconAdapter } from './core/MaterialDesignIconAdapter';
import { PageAdapter } from './core/PageAdapter';
import { PasswordFieldAdapter } from './core/PasswordFieldAdapter';
import { ProgressAdapter } from './core/ProgressAdapter';
import { RadioGroupAdapter } from './core/RadioGroupAdapter';
import { SectionAdapter } from './core/SectionAdapter';
import { SelectAdapter } from './core/SelectAdapter';
import { ServerStatusAdapter } from './core/ServerStatusAdapter';
import { SizeHandlerAdapter } from './core/SizeHandlerAdapter';
import { StreamlineIconAdapter } from './core/StreamlineIconAdapter';
import { SwitchAdapter } from './core/SwitchAdapter';
import { TableAdapter } from './core/TableAdapter';
import { TabsAdapter } from './core/TabsAdapter';
import { TextAdapter } from './core/TextAdapter';
import { TextareaAdapter } from './core/TextareaAdapter';
import { TextFieldAdapter } from './core/TextFieldAdapter';
import { TimeFieldAdapter } from './core/TimeFieldAdapter';
import { TimerAdapter } from './core/TimerAdapter';
import { TooltipAdapter } from './core/TooltipAdapter';
import { UiHandlerAdapter } from './core/UiHandlerAdapter';
import { VisibilityHandlerAdapter } from './core/VisibilityHandlerAdapter';
import { WaypointAdapter } from './core/WaypointAdapter';
import { AfterEffectsMediaAdapter } from './extension/AfterEffectsMediaAdapter';
import { BarChartAdapter } from './extension/BarChartAdapter';
import { CarouselAdapter } from './extension/CarouselAdapter';
import { DataGridAdapter } from './extension/DataGridAdapter';
import { FortuneWheelAdapter } from './extension/FortuneWheelAdapter';
import { HeaderAreaAdapter } from './extension/HeaderAreaAdapter';
import { ImageCropperAdapter } from './extension/ImageCropperAdapter';
import { LineChartAdapter } from './extension/LineChartAdapter';
import { NestedChecklistAdapter } from './extension/NestedChecklistAdapter';
import { OverlayEffectAdapter } from './extension/OverlayEffectAdapter';
import { PanelGroupAdapter } from './extension/PanelGroupAdapter';
import { PdfViewerAdapter } from './extension/PdfViewerAdapter';
import { PieChartAdapter } from './extension/PieChartAdapter';
import { PortrayedListAdapter } from './extension/PortrayedListAdapter';
import { ProfileMenuAdapter } from './extension/ProfileMenuAdapter';
import { SliderAdapter } from './extension/SliderAdapter';
import { SplitLayoutAdapter } from './extension/SplitLayoutAdapter';
import { TreeGraphAdapter } from './extension/TreeGraphAdapter';
import { WorkflowGraphAdapter } from './extension/WorkflowGraphAdapter';

export const COMPONENT_MAP: Record<SmartFaceComponentNamesType, ComponentType<any>> = {
  /* Application adapters */
  CommentList: CommentListAdapter,
  CmdTable: CmdTableAdapter,
  DataWidget: DataWidgetAdapter,
  HrworksAdminLayout: HrworksAdminLayoutAdapter,
  HrworksAdminLayoutProfileImage: HrworksAdminLayoutProfileImageAdapter,
  HrworksUserWhatsNew: HrworksUserWhatsNewAdapter,
  OnboardingController: OnboardingControllerAdapter,
  OnboardingLoginPage: OnboardingLoginPageAdapter,
  OnboardingWelcomePage: OnboardingWelcomePageAdapter,
  SqwClockInButton: SqwClockInButtonAdapter,
  SqwDropdownMenu: SqwDropdownMenuAdapter,
  SqwLayout: SqwLayoutAdapter,
  SqwProfileMenu: SqwProfileMenuAdapter,
  SqwSearchField: SqwSearchFieldAdapter,
  SqwSupportMenu: SqwSupportMenuAdapter,
  VerticalNavigation: VerticalNavigationAdapter,
  /* Core adapters */
  Accordion: AccordionAdapter,
  Alert: AlertAdapter,
  Audio: AudioSideEffectAdapter,
  BackendRequest: BackendRequestSideEffectAdapter,
  Badge: BadgeAdapter,
  BlankLayout: BlankLayoutAdapter,
  Breadcrumb: BreadcrumbAdapter,
  Button: ButtonAdapter,
  Card: CardAdapter,
  Checkbox: CheckboxAdapter,
  CheckboxGroup: CheckboxGroupAdapter,
  ClassicLayout: ClassicLayoutAdapter,
  CollapsibleMenu: CollapsibleMenuAdapter,
  ComboBox: ComboBoxAdapter,
  Container: ContainerAdapter,
  DateField: DateFieldAdapter,
  DateRangeField: DateRangeFieldAdapter,
  DecimalField: DecimalFieldAdapter,
  DropdownMenu: DropdownMenuAdapter,
  Dropzone: DropzoneAdapter,
  FileManager: FileManagerAdapter,
  Flexbox: FlexboxAdapter,
  FontAwesomeIcon: FontAwesomeIconAdapter,
  Form: FormAdapter,
  FormText: FormTextAdapter,
  Grid: GridAdapter,
  IconButton: IconButtonAdapter,
  Iframe: IframeAdapter,
  Image: ImageAdapter,
  IntegerField: IntegerFieldAdapter,
  InternalServerError: InternalServerErrorAdapter,
  KeyDown: KeyDownSideEffectAdapter,
  List: ListAdapter,
  LoadingAnimation: LoadingAnimationAdapter,
  LoadingOverlay: LoadingOverlayAdapter,
  MaterialDesignIcon: MaterialDesignIconAdapter,
  Page: PageAdapter,
  PasswordField: PasswordFieldAdapter,
  Progress: ProgressAdapter,
  RadioGroup: RadioGroupAdapter,
  Section: SectionAdapter,
  SelectBox: SelectAdapter,
  ServerStatus: ServerStatusAdapter,
  SizeHandler: SizeHandlerAdapter,
  StreamlineIcon: StreamlineIconAdapter,
  Switch: SwitchAdapter,
  Table: TableAdapter,
  Tabs: TabsAdapter,
  Text: TextAdapter,
  Textarea: TextareaAdapter,
  TextField: TextFieldAdapter,
  TimeField: TimeFieldAdapter,
  Timer: TimerAdapter,
  Tooltip: TooltipAdapter,
  UiHandler: UiHandlerAdapter,
  VisibilityHandler: VisibilityHandlerAdapter,
  Waypoint: WaypointAdapter,
  /* Extension adapters */
  AfterEffectsMedia: AfterEffectsMediaAdapter,
  BarChart: BarChartAdapter,
  DataGrid: DataGridAdapter,
  Carousel: CarouselAdapter,
  FortuneWheel: FortuneWheelAdapter,
  HeaderArea: HeaderAreaAdapter,
  ImageCropper: ImageCropperAdapter,
  LineChart: LineChartAdapter,
  NestedChecklist: NestedChecklistAdapter,
  OverlayEffect: OverlayEffectAdapter,
  PanelGroup: PanelGroupAdapter,
  PdfViewer: PdfViewerAdapter,
  PieChart: PieChartAdapter,
  ProfileMenu: ProfileMenuAdapter,
  PortrayedList: PortrayedListAdapter,
  Slider: SliderAdapter,
  SplitLayout: SplitLayoutAdapter,
  TreeGraph: TreeGraphAdapter,
  WorkflowGraph: WorkflowGraphAdapter,
};
