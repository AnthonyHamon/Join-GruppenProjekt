function generateSummaryHTML(){
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML = `
    <main>
        <div class="summary_title">
            <h1>Join 360</h1>
            <img src="../images/Vector 5.svg" alt="">
            <span>Key Metrics at a Glance</span>
        </div>

        <div class="summary_content_ctn">
            <section class="summary_section_left">
                <div class="summary_start_row">
                    <div id="to-do-thumbnail" class="summary_start_row_thumbnails">
                        <img src="../images/to_do_thumbnail.svg" alt="">
                        <div class="flex_colum_align_center">
                            <span id="to-do-task-number" class="summary_digits">1</span>
                            <span class="font_20px">To-Do</span>
                        </div>
                    </div>
                    <div id="done-thumbnail" class="summary_start_row_thumbnails">
                        <img src="../images/done_thumbnail.svg" alt="">
                        <div class="flex_colum_align_center">
                            <span id="done-tasks-number" class="summary_digits">1</span>
                            <span class="font_20px">Done</span>
                        </div>
                    </div>
                </div>
                <div class="summary_second_row">
                    <div class="second_row_left_section">
                        <div class="prio_circle">
                            <img src="../images/summary_prio_alta.svg" alt="">
                        </div>
                        <div class="flex_colum_align_center">
                            <span class="summary_digits">1</span>
                            <span class="font_20px">Urgent</span>
                        </div>
                    </div>
                    <img src="../images/summary_second_row_vector.svg" alt="">
                    <div class="second_row_right_section">
                        <span id="current-date-summary">November 11, 2023</span>
                        <span>Upcoming Deadline</span>
                    </div>
                </div>
                <div class="summary_ending_row">
                    <div class="summary_ending_row_thumbnails">
                        <span class="summary_digits">5</span>
                        <span class="nowrap_justify_center font_20px">Tasks in Board</span>
                    </div>
                    <div class="summary_ending_row_thumbnails">
                        <span class="summary_digits">2</span>
                        <span class="nowrap_justify_center font_20px">Tasks in Progress</span>
                    </div>
                    <div class="summary_ending_row_thumbnails">
                        <span class="summary_digits">2</span>
                        <span class="nowrap_justify_center font_20px">Awaiting feedback</span>
                    </div>
                </div>
            </section>
            <section class="summary_section_right">
                    <span id="greeting">Good morning,</span>
                    <span id="greeted_name">Sofia Müller</span>
            </section>
        </div>
    </main>

    `
}