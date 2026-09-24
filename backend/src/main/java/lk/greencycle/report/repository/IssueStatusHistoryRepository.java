package lk.greencycle.report.repository;

import lk.greencycle.report.entity.IssueStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueStatusHistoryRepository extends JpaRepository<IssueStatusHistory, Long> {
    List<IssueStatusHistory> findByIssueReportIdOrderByChangedAtAsc(Long issueReportId);
}
