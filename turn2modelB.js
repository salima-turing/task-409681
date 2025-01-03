class EnergyManagementSystem {
    // ... (Previous code remains the same)

    constructor(sources) {
        // ... (Previous code remains the same)
        this.taskQueue = []; // Initialize the task queue
    }

    // Enqueue a new task with a given priority (1-5, with 5 being highest)
    enqueueTask(task, priority = 3) {
        if (priority < 1 || priority > 5) {
            throw new Error("Priority must be between 1 and 5.");
        }
        this.taskQueue.push({ task, priority });
        this.taskQueue.sort((a, b) => b.priority - a.priority); // Sort tasks by priority
    }

    // Dequeue the next task based on energy levels
    dequeueTask() {
        if (!this.taskQueue.length) {
            return null;
        }

        // Check if we should prioritize tasks based on energy levels
        if (this.currentEnergyLevel < this.loadThresholds.low) {
            // Prioritize tasks with higher priorities when energy is low
            for (let i = this.taskQueue.length - 1; i >= 0; i--) {
                const task = this.taskQueue[i];
                if (task.priority >= 4) {
                    return this.taskQueue.splice(i, 1)[0];
                }
            }
            // If no high-priority task is found, dequeue the lowest priority one
            return this.taskQueue.shift();
        } else {
            // Dequeue tasks based on their original order when energy is high
            return this.taskQueue.shift();
        }
    }

    // Manage energy and tasks
    manageEnergyAndTasks() {
        this.detectEnergyLevels();
        this.scalePerformance();

        // Execute tasks based on available energy
        const availableResources = this.allocateResources();
        let currentLoad = 0;

        while (currentLoad < availableResources.computation) {
            const nextTask = this.dequeueTask();
            if (!nextTask) {
                break;
            }

            // Simulate task execution (assuming it takes 1 unit of computation)
            currentLoad += 1;
            console.log(`Executing task with priority ${nextTask.priority}: ${nextTask.task}`);
        }
    }
}

// ... (Previous code remains the same)

// Example usage:
const sources = [/* ... */];
const energyManagementSystem = new EnergyManagementSystem(sources);

// Enqueue tasks with different priorities
energyManagementSystem.enqueueTask("High-priority task 1", 5);
energyManagementSystem.enqueueTask("Medium-priority task 2", 3);
energyManagementSystem.enqueueTask("Low-priority task 3", 1);
energyManagementSystem.enqueueTask("Medium-priority task 4", 3);

// Periodically manage energy and tasks
setInterval(() => {
    energyManagementSystem.manageEnergyAndTasks();
}, 2000);
