
// Original Code starts
// import PropTypes from 'prop-types';
// import ComputerDesktopIcon from '@heroicons/react/24/solid/ComputerDesktopIcon';
// import DeviceTabletIcon from '@heroicons/react/24/solid/DeviceTabletIcon';
// import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon';
// import {
//   Box,
//   Card,
//   CardContent,
//   CardHeader,
//   Stack,
//   SvgIcon,
//   Typography,
//   useTheme
// } from '@mui/material';
// import { Chart } from 'src/components/chart';

// const useChartOptions = (labels) => {
//   const theme = useTheme();

//   return {
//     chart: {
//       background: 'transparent'
//     },
//     colors: [
//       theme.palette.primary.main,
//       theme.palette.success.main,
//       theme.palette.warning.main
//     ],
//     dataLabels: {
//       enabled: false
//     },
//     labels,
//     legend: {
//       show: false
//     },
//     plotOptions: {
//       pie: {
//         expandOnClick: false
//       }
//     },
//     states: {
//       active: {
//         filter: {
//           type: 'none'
//         }
//       },
//       hover: {
//         filter: {
//           type: 'none'
//         }
//       }
//     },
//     stroke: {
//       width: 0
//     },
//     theme: {
//       mode: theme.palette.mode
//     },
//     tooltip: {
//       fillSeriesColor: false
//     }
//   };
// };

// const iconMap = {
//   Low: (
//     <SvgIcon>
//       <ComputerDesktopIcon />
//     </SvgIcon>
//   ),
//   Medium: (
//     <SvgIcon>
//       <DeviceTabletIcon />
//     </SvgIcon>
//   ),
//   High: (
//     <SvgIcon>
//       <PhoneIcon />
//     </SvgIcon>
//   )
// };

// export const OverviewTraffic = (props) => {
//   const { chartSeries, labels, sx } = props;
//   const chartOptions = useChartOptions(labels);

//   return (
//     <Card sx={sx}>
//       <CardHeader title="Prediction Analysis" />
//       <CardContent>
//         <Chart
//           height={300}
//           options={chartOptions}
//           series={chartSeries}
//           type="donut"
//           width="100%"
//         />
//         <Stack
//           alignItems="center"
//           direction="row"
//           justifyContent="center"
//           spacing={2}
//           sx={{ mt: 2 }}
//         >
//           {chartSeries.map((item, index) => {
//             const label = labels[index];

//             return (
//               <Box
//                 key={label}
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center'
//                 }}
//               >
//                 {iconMap[label]}
//                 <Typography
//                   sx={{ my: 1 }}
//                   variant="h6"
//                 >
//                   {label}
//                 </Typography>
//                 <Typography
//                   color="text.secondary"
//                   variant="subtitle2"
//                 >
//                   {item}%
//                 </Typography>
//               </Box>
//             );
//           })}
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// };

// OverviewTraffic.propTypes = {
//   chartSeries: PropTypes.array.isRequired,
//   labels: PropTypes.array.isRequired,
//   sx: PropTypes.object
// };
// original code ends


import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { Chart } from 'src/components/chart';

const useChartOptions = (labels) => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent'
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main
    ],
    dataLabels: {
      enabled: false
    },
    labels,
    legend: {
      show: false
    },
    plotOptions: {
      pie: {
        expandOnClick: false
      }
    },
    states: {
      active: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      fillSeriesColor: false
    }
  };
};

const colorMap = {
  Low: '#6366f1',    // Blue for Low
  Medium: '#10b981', // Green for Medium
  High: '#f39c12'    // Yellow for High
};

export const PredictionAnalysis = (props) => {
  const { chartSeries, labels, sx } = props;
  const chartOptions = useChartOptions(labels);

  return (
    <Card sx={sx}>
      <CardHeader title="Prediction Analysis" />
      <CardContent>
        <Chart
          height={300}
          options={chartOptions}
          series={chartSeries}
          type="donut"
          width="100%"
        />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={5}
          sx={{ mt: 3 }}
        >
          {chartSeries.map((item, index) => {
            const label = labels[index];

            return (
              <Box
                key={label}
                sx={{
                  backgroundColor: colorMap[label],
                  borderRadius: '4px',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff', // Change text color if needed
                  textAlign: 'center',
                  padding: '8px', // Adjust spacing around the box
                }}
              >
                <Typography
                  sx={{ mt: 9, mb: 0 }}
                  variant="subtitle2"
                >
                  {item}%
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="caption"
                >
                  {label}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

PredictionAnalysis.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object
};
