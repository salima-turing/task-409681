class EnergyManagementSystem {
    constructor(sources) {
        // Initialize with sources and their current energy levels
        this.powerSources = sources; // Array of power source objects
        this.performanceLevel = 100; // 100% performance level by default
        this.loadThresholds = {
            low: 30, // below which we scale down
            medium: 60, // optimal operational level
            high: 90  // at which we can maximize performance
        };
    }

    // Simulate energy level detection from multiple power sources
    detectEnergyLevels() {
        this.currentEnergyLevel = this.powerSources.reduce((total, source) => {
            return total + source.getCurrentEnergy();
        }, 0) / this.powerSources.length; // Average energy level
        console.log(`Detected average energy level: ${this.currentEnergyLevel}%`);
    }

    // Scale performance based on the detected energy level
    scalePerformance() {
        if (this.currentEnergyLevel < this.loadThresholds.low) {
            this.performanceLevel = 20; // Throttle down to 20%
            console.log("Energy is low, throttling performance to 20%.");
        } else if (this.currentEnergyLevel < this.loadThresholds.medium) {
            this.performanceLevel = 50; // Moderate performance
            console.log("Energy is medium, adjusting performance to 50%.");
        } else if (this.currentEnergyLevel < this.loadThresholds.high) {
            this.performanceLevel = 80; // Good performance
            console.log("Energy is high, setting performance to 80%.");
        } else {
            this.performanceLevel = 100; // Full performance
            console.log("Energy is very high, maximizing performance to 100%.");
        }
    }

    // Allocate resources based on the current performance level
    allocateResources() {
        // Assume some resource-heavy operations we adjust based on the performance level
        const resources = {
            computation: 0,
            memory: 0,
            bandwidth: 0
        };

        resources.computation = 10 * (this.performanceLevel / 100); // Scale computation based on performance level
        resources.memory = 5 * (this.performanceLevel / 100);
        resources.bandwidth = 3 * (this.performanceLevel / 100);

        console.log(`Allocating resources -> Computation: ${resources.computation}, Memory: ${resources.memory}, Bandwidth: ${resources.bandwidth}`);
        return resources;
    }

    // Main execution loop to manage energy and resources
    manageEnergy() {
        this.detectEnergyLevels();
        this.scalePerformance();
        return this.allocateResources();
    }
}

// Simulation of power sources
class PowerSource {
    constructor(name, energyLevel) {
        this.name = name;
        this.energyLevel = energyLevel;
    }

    getCurrentEnergy() {
        return this.energyLevel; // in percentage
    }

    // Simulate changing energy levels over time
    changeEnergyLevel(newLevel) {
        this.energyLevel = newLevel;
    }
}

// Example usage
const sources = [
    new PowerSource("Solar Panel", 80),
    new PowerSource("Wind Turbine", 60),
    new PowerSource("Battery", 40)
];

const energyManagementSystem = new EnergyManagementSystem(sources);

// Periodically manage energy (you might want to call this every few seconds)
setInterval(() => {
    energyManagementSystem.manageEnergy();
}, 5000);

// Example of changing energy levels over time (for testing)
setTimeout(() => sources[2].changeEnergyLevel(20), 15000); // simulates battery level dropping after 15 seconds
setTimeout(() => sources[0].changeEnergyLevel(100), 30000); // simulates solar panel level rising after 30 seconds
