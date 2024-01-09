import { MdPieChartOutline, MdBarChart } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

type TypeOfChartSwitcherProps = {
    typeOfChart: 'PIE' | 'BAR';
    setTypeOfChart: React.Dispatch<React.SetStateAction<'PIE' | 'BAR'>>;
};
export default function TypeOfChartSwitcher({
    typeOfChart,
    setTypeOfChart,
}: TypeOfChartSwitcherProps) {
    const toggleChart = () => {
        typeOfChart === 'PIE' ? setTypeOfChart('BAR') : setTypeOfChart('PIE');
    };
    return (
        <motion.button
            onClick={toggleChart}
            whileTap={{ scale: 0.97 }}
            className="w-fit hover:text-highlight dark:hover:text-highlightDark duration-300"
        >
            {typeOfChart === 'PIE' ? (
                <>
                    <motion.div
                        data-tooltip-id="poll-toggle-bar-tooltip"
                        data-tooltip-content="Show bar chart"
                        data-tooltip-variant="dark"
                        data-tooltip-delay-show={500}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex items-center gap-4"
                    >
                        <MdBarChart
                            size="1.5em"
                            style={{ transform: 'rotate(90deg)' }}
                        />
                    </motion.div>
                    <Tooltip
                        id="poll-toggle-bar-tooltip"
                        style={{ fontSize: '0.75rem' }}
                    />
                </>
            ) : (
                <>
                    <motion.div
                        data-tooltip-id="poll-toggle-pie-tooltip"
                        data-tooltip-content="Show pie chart"
                        data-tooltip-variant="dark"
                        data-tooltip-delay-show={500}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex items-center gap-4"
                    >
                        <MdPieChartOutline size="1.5em" />
                    </motion.div>
                    <Tooltip
                        id="poll-toggle-pie-tooltip"
                        style={{ fontSize: '0.75rem' }}
                    />
                </>
            )}
        </motion.button>
    );
}
